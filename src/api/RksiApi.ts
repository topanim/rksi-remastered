export type NewsItem = {
  id: number
  title: string
  href: string
  date?: string
  image?: string
  excerpt?: string
}

export type NewsPage = {
  items: NewsItem[]
  page: number
  hasPrev: boolean
  hasNext: boolean
  totalPages: number
}

export type NewsDetail = {
  id: number
  title: string
  date?: string
  subtitle?: string
  paragraphs?: string[]
  images?: string[]
  embeds?: string[]
  links?: { href: string; text: string }[]
  contentHtml: string
}

export type SectionDetail = {
  title: string
  content: string
  lastUpdated: string
  originalUrl: string
}

// Новые типы для структурированного контента
export type ContentElement = 
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: 1 | 2 | 3 | 4 | 5 | 6; content: string; className?: string }
  | { type: 'bold'; content: string }
  | { type: 'table'; headers?: string[]; data: string[][] }
  | { type: 'list'; items: string[]; ordered: boolean }
  | { type: 'image'; src: string; alt?: string; title?: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'divider' }
  | { type: 'raw'; html: string }

export type StructuredSectionDetail = {
  title: string
  content: ContentElement[]
  lastUpdated: string
  originalUrl: string
}

const BASE = "http://192.168.3.52:3000/rksi"
const ORIGIN = "http://192.168.3.52:3000/rksi"

function normalizeUrl(url?: string | null): string | undefined {
  if (!url) return undefined
  if (url.startsWith("http")) return url
  if (url.startsWith("//")) return `https:${url}`
  if (url.startsWith("/")) return `${ORIGIN}${url}`
  return `${ORIGIN}/${url}`
}

async function fetchWithTimeout(resource: string, options?: RequestInit & { timeoutMs?: number }) {
  const { timeoutMs = 15000, ...init } = options || {}
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(resource, { 
         ...init, 
         signal: controller.signal 
        })
    return res
  } finally {
    clearTimeout(id)
  }
}

export class RksiApi {
  static async getNews(page: number = 1): Promise<NewsPage> {
    const cacheKey = `news:page:${page}`
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as NewsPage & { timestamp: number }
        // Кэш действителен 5 минут
        if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
          console.info(`🗄️ [RksiApi.getNews] cache hit for page=${page}. items=${parsed.items.length}`)
          return parsed
        }
      } catch {}
    }
    console.info(`🌐 [RksiApi.getNews] fetching page=${page} → ${BASE}/news/${page}`)
    const res = await fetchWithTimeout(`${BASE}/news/${page}`, { timeoutMs: 15000 })
    console.info(`📥 [RksiApi.getNews] status=${res.status}`)
    const html = await res.text()
    const doc = new DOMParser().parseFromString(html, "text/html")

    console.info(`📥 [RksiApi.getNews] ${doc.body.innerHTML}`)

    const items: NewsItem[] = []
    // Точная структура карточек: .flexnews
    const candidates = doc.querySelectorAll<HTMLElement>(".flexnews")
    console.info(`🧩 [RksiApi.getNews] .flexnews found=${candidates.length}`)
    candidates.forEach((el, idx) => {
      const link = el.querySelector<HTMLAnchorElement>("a[href*='/news/n_']")
      if (!link) return
      const rawHref = link.getAttribute("href") || ""
      const hrefPath = rawHref.startsWith("http") ? rawHref : new URL(rawHref, ORIGIN).pathname
      const idMatch = hrefPath.match(/n_(\d+)/)
      const id = idMatch ? Number(idMatch[1]) : NaN
      if (!id) return

      const title = (el.querySelector("h4")?.textContent || link.textContent || "").trim()
      const date = (el.querySelector(".smalli")?.textContent || "").trim()
      const img = normalizeUrl(el.querySelector<HTMLImageElement>("img")?.getAttribute("src"))

      // Описание: возьмём текст второго див-а внутри .flexnews
      let excerpt = ""
      const blocks = el.querySelectorAll<HTMLElement>(":scope > div")
      if (blocks.length > 0) {
        const contentDiv = blocks[blocks.length - 1]
        // Уберём заголовки и ссылки more
        contentDiv.querySelectorAll("h4, a, span.smalli, br").forEach((n) => n.remove())
        excerpt = (contentDiv.textContent || "").replace(/\s+/g, " ").trim()
      }

      const item: NewsItem = { id, title, href: hrefPath, date, image: img, excerpt }
      items.push(item)
      console.debug(`📰 [RksiApi.getNews] item#${idx}:`, item)
    })

    // Определим наличие страниц назад/вперёд (best effort)
    const pagination = doc.querySelector(".pagination, nav[aria-label='pagination'], .pager, .pages")
    const relPrev = pagination?.querySelector("a[rel='prev']") as HTMLAnchorElement | null
    const relNext = pagination?.querySelector("a[rel='next']") as HTMLAnchorElement | null
    const hasPrev = !!relPrev || page > 1
    const hasNext = !!relNext || items.length > 0

    // Определим общее количество страниц из navigation
    let totalPages = page
    const navigationText = doc.querySelector("main p")?.textContent || ""
    console.info(`🧭 [RksiApi.getNews] navigation text: "${navigationText}"`)
    
    // Ищем последний номер страницы в navigation
    const pageMatches = navigationText.match(/(\d+)(?=\s*$)/)
    if (pageMatches) {
      totalPages = Number(pageMatches[1])
      console.info(`🧭 [RksiApi.getNews] found totalPages=${totalPages} from navigation`)
    } else {
      // Fallback: если не нашли в navigation, используем текущую логику
      if (hasNext) {
        totalPages = page + 1
      }
    }

    const payload: NewsPage & { timestamp: number } = { 
      items, 
      page, 
      hasPrev, 
      hasNext, 
      totalPages,
      timestamp: Date.now()
    }
    console.info(`✅ [RksiApi.getNews] parsed items=${items.length} hasPrev=${hasPrev} hasNext=${hasNext} totalPages=${totalPages}`)
    try { sessionStorage.setItem(cacheKey, JSON.stringify(payload)) } catch {}
    return payload
  }

  static async getNewsDetail(id: number): Promise<NewsDetail> {
    const cacheKey = `news:detail:${id}`
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as NewsDetail & { timestamp: number }
        // Кэш действителен 10 минут для детальной страницы
        if (Date.now() - parsed.timestamp < 10 * 60 * 1000) {
          console.info(`🗄️ [RksiApi.getNewsDetail] cache hit for id=${id}`)
          return parsed
        }
      } catch {}
    }
    console.info(`🌐 [RksiApi.getNewsDetail] fetching id=${id} → ${BASE}/news/n_${id}`)
    const res = await fetchWithTimeout(`${BASE}/news/n_${id}`, { timeoutMs: 15000 })
    console.info(`📥 [RksiApi.getNewsDetail] status=${res.status}`)
    const html = await res.text()
    const doc = new DOMParser().parseFromString(html, "text/html")

    // Заголовок и дата в <h1> в формате: "Title [dd.mm.yyyy]"
    const h1Raw = (doc.querySelector("h1")?.textContent || "Новость").trim()
    const m = h1Raw.match(/^(.*)\[(.*)\]\s*$/)
    const title = m ? m[1].trim() : h1Raw
    const date = m ? m[2].trim() : undefined

    // Возьмём основное содержимое
    const mainEl = doc.querySelector("main") || doc.body
    // Уберём скрипты/лишнее
    mainEl.querySelectorAll("script, style, nav, header, footer").forEach((n) => n.remove())
    // Подзаголовок — первый <b> в main
    const subtitle = mainEl.querySelector("b")?.textContent?.trim()
    // Параграфы — все <p>, не содержащие <img>
    const paragraphs = Array.from(mainEl.querySelectorAll<HTMLParagraphElement>("p, li")).filter(p => !p.querySelector("img")).map(p => p.textContent?.trim() || "").filter(Boolean)
    // Картинки — внутри .img50
    const images = Array.from(mainEl.querySelectorAll<HTMLImageElement>(".img50 img")).map(img => normalizeUrl(img.getAttribute("src"))!).filter(Boolean)
    // Видеовставки/iframes — соберём любые iframe в main
    const embeds = Array.from(mainEl.querySelectorAll<HTMLIFrameElement>("iframe")).map(f => normalizeUrl(f.getAttribute("src")) || "").filter(Boolean)
    // Ссылки внизу — любые <a> в main (оставим только внешние/абсолютные)
    const links = Array.from(mainEl.querySelectorAll<HTMLAnchorElement>("a")).map(a => ({
      href: normalizeUrl(a.getAttribute("href")) || "",
      text: (a.textContent || "").trim()
    })).filter(l => !!l.href)

    // Нормализация ресурсов в HTML
    mainEl.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      const src = img.getAttribute("src")
      const normalized = normalizeUrl(src)
      if (normalized) img.setAttribute("src", normalized)
    })
    mainEl.querySelectorAll<HTMLAnchorElement>("a").forEach((a) => {
      const href = a.getAttribute("href")
      const normalized = normalizeUrl(href)
      if (normalized) a.setAttribute("href", normalized)
    })
    const contentHtml = mainEl.innerHTML

    const payload: NewsDetail & { timestamp: number } = { 
      id, 
      title, 
      date, 
      subtitle, 
      paragraphs, 
      images, 
      embeds, 
      links, 
      contentHtml,
      timestamp: Date.now()
    }
    console.info(`✅ [RksiApi.getNewsDetail] parsed id=${id} title="${title}"`)
    try { sessionStorage.setItem(cacheKey, JSON.stringify(payload)) } catch {}
    return payload
  }

  static prefetchNewsPages(currentPage: number, hasPrev: boolean, hasNext: boolean) {
    if (hasPrev) this.getNews(currentPage - 1).catch((e) => console.warn(`⚠️ prefetch prev failed:`, e))
    if (hasNext) this.getNews(currentPage + 1).catch((e) => console.warn(`⚠️ prefetch next failed:`, e))
  }

  static async getSectionDetail(path: string): Promise<StructuredSectionDetail> {
    const cacheKey = `section:${path}`
    const cached = sessionStorage.getItem(cacheKey)
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as StructuredSectionDetail & { timestamp: number }
        // Кэш действителен 1 час для страниц подразделов
        if (Date.now() - parsed.timestamp < 60 * 60 * 1000) {
          console.info(`🗄️ [RksiApi.getSectionDetail] cache hit for path=${path}`)
          return parsed
        }
      } catch {
        // Если кэш поврежден, удаляем его
        sessionStorage.removeItem(cacheKey)
      }
    }

    console.info(`🌐 [RksiApi.getSectionDetail] fetching path=${path} → ${BASE}/${path}`)
    const res = await fetchWithTimeout(`${BASE}/${path}`, { timeoutMs: 15000 })
    console.info(`📥 [RksiApi.getSectionDetail] status=${res.status}`)
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const html = await res.text()
    const doc = new DOMParser().parseFromString(html, "text/html")

    // Извлекаем содержимое тега main
    const mainElement = doc.querySelector("main")
    const titleElement = doc.querySelector("title") || doc.querySelector("h1")
    
    if (!mainElement) {
      throw new Error('Не удалось найти содержимое страницы. Возможно, страница не существует или имеет другую структуру.')
    }

    // Парсим HTML в структурированные данные
    let structuredContent: ContentElement[]
    try {
      structuredContent = this.parseHtmlToStructuredContent(mainElement)
    } catch (error) {
      console.warn('Ошибка парсинга HTML, используем fallback:', error)
      // Fallback: если парсинг не удался, возвращаем raw HTML
      structuredContent = [{
        type: 'raw',
        html: mainElement.innerHTML
      }]
    }
    
    const payload: StructuredSectionDetail & { timestamp: number } = {
      title: titleElement?.textContent?.trim() || `Страница: ${path}`,
      content: structuredContent,
      lastUpdated: new Date().toISOString(),
      originalUrl: `https://rksi.ru/${path}`,
      timestamp: Date.now()
    }

    console.info(`✅ [RksiApi.getSectionDetail] parsed path=${path} title="${payload.title}" elements=${structuredContent.length}`)
    try { sessionStorage.setItem(cacheKey, JSON.stringify(payload)) } catch {}
    return payload
  }

  private static cleanMainContent(mainElement: Element): string {
    // Клонируем элемент, чтобы не изменять оригинал
    const clone = mainElement.cloneNode(true) as Element
    
    // Удаляем ненужные элементы
    const elementsToRemove = clone.querySelectorAll('script, style, nav, header, footer, .sidebar, .navigation')
    elementsToRemove.forEach(el => el.remove())
    
    // Очищаем атрибуты, оставляя только необходимые
    const allElements = clone.querySelectorAll('*')
    allElements.forEach(el => {
      const allowedAttributes = ['href', 'src', 'alt', 'title', 'class']
      const attributes = Array.from(el.attributes)
      attributes.forEach(attr => {
        if (!allowedAttributes.includes(attr.name)) {
          el.removeAttribute(attr.name)
        }
      })
    })
    
    // Нормализация ресурсов в HTML
    clone.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
      const src = img.getAttribute("src")
      const normalized = normalizeUrl(src)
      if (normalized) img.setAttribute("src", normalized)
    })
    clone.querySelectorAll<HTMLAnchorElement>("a").forEach((a) => {
      const href = a.getAttribute("href")
      const normalized = normalizeUrl(href)
      if (normalized) a.setAttribute("href", normalized)
    })
    
    return clone.innerHTML
  }

  private static parseHtmlToStructuredContent(mainElement: Element): ContentElement[] {
    const elements: ContentElement[] = []
    
    // Проходим по всем дочерним элементам
    for (const child of Array.from(mainElement.children)) {
      const tagName = child.tagName.toLowerCase()
      const className = child.getAttribute('class') || ''
      
      switch (tagName) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          const level = parseInt(tagName.charAt(1)) as 1 | 2 | 3 | 4 | 5 | 6
          elements.push({
            type: 'heading',
            level,
            content: child.textContent?.trim() || '',
            className
          })
          break
          
        case 'p':
          // Проверяем, содержит ли параграф только текст или другие элементы
          if (child.children.length === 0) {
            const text = child.textContent?.trim()
            if (text) {
              elements.push({ type: 'paragraph', content: text })
            }
          } else {
            // Если параграф содержит другие элементы, парсим их рекурсивно
            const nestedElements = this.parseHtmlToStructuredContent(child)
            elements.push(...nestedElements)
          }
          break
          
        case 'b':
        case 'strong':
          elements.push({ type: 'bold', content: child.textContent?.trim() || '' })
          break
          
        case 'table':
          const tableData = this.parseTable(child as HTMLTableElement)
          if (tableData) {
            elements.push(tableData)
          }
          break
          
        case 'ul':
        case 'ol':
          const listItems = Array.from(child.querySelectorAll('li')).map(li => li.textContent?.trim() || '')
          elements.push({
            type: 'list',
            items: listItems.filter(Boolean),
            ordered: tagName === 'ol'
          })
          break
          
        case 'img':
          const img = child as HTMLImageElement
          elements.push({
            type: 'image',
            src: img.src,
            alt: img.alt || undefined,
            title: img.title || undefined
          })
          break
          
        case 'a':
          const link = child as HTMLAnchorElement
          elements.push({
            type: 'link',
            text: link.textContent?.trim() || '',
            href: link.href
          })
          break
          
        case 'hr':
          elements.push({ type: 'divider' })
          break
          
        case 'div':
          // Рекурсивно парсим содержимое div
          if (child.children.length > 0) {
            const nestedElements = this.parseHtmlToStructuredContent(child)
            elements.push(...nestedElements)
          } else {
            const text = child.textContent?.trim()
            if (text) {
              elements.push({ type: 'paragraph', content: text })
            }
          }
          break
          
        default:
          // Для неизвестных элементов сохраняем как raw HTML
          if (child.textContent?.trim()) {
            elements.push({ type: 'raw', html: child.outerHTML })
          }
      }
    }
    
    return elements
  }

  private static parseTable(tableElement: HTMLTableElement): ContentElement | null {
    const rows = Array.from(tableElement.querySelectorAll('tr'))
    if (rows.length === 0) return null
    
    const data: string[][] = []
    let headers: string[] | undefined
    
    rows.forEach((row, rowIndex) => {
      const cells = Array.from(row.querySelectorAll('td, th')).map(cell => 
        cell.textContent?.trim() || ''
      )
      
      if (rowIndex === 0 && row.querySelector('th')) {
        // Первая строка содержит заголовки
        headers = cells
      } else {
        data.push(cells)
      }
    })
    
    return {
      type: 'table',
      headers,
      data
    }
  }
}



