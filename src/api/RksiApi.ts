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
    const paragraphs = Array.from(mainEl.querySelectorAll<HTMLParagraphElement>("p")).filter(p => !p.querySelector("img")).map(p => p.textContent?.trim() || "").filter(Boolean)
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
}



