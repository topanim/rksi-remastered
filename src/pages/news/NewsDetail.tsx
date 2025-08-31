import { useEffect, useMemo, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { RksiApi, type NewsDetail } from "@/api/RksiApi"
import { Skeleton } from "@/components/ui/skeleton"
import { Link as LinkIcon, Play, ArrowLeft } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"

function Chip({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
    >
      <LinkIcon className="size-4" />
      <span className="truncate max-w-[16rem]">{text}</span>
    </a>
  )
}

export default function NewsDetailPage() {
  const { id } = useParams()
  const numericId = Number(id)
  const [data, setData] = useState<NewsDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  type MediaKind = "image" | "embed"
  type LightboxState = { open: boolean; index: number }
  const [lightbox, setLightbox] = useState<LightboxState>({ open: false, index: 0 })

  const media = useMemo(() => {
    if (!data) return [] as { kind: MediaKind; src: string }[]
    const imgs = (data.images || []).map((src) => ({ kind: "image" as MediaKind, src }))
    const ifr = (data.embeds || []).map((src) => ({ kind: "embed" as MediaKind, src }))
    return [...imgs, ...ifr]
  }, [data])

  // Стрелочная навигация в открытом диалоге
  useEffect(() => {
    if (!lightbox.open || media.length === 0) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        setLightbox((s) => ({ ...s, index: (s.index + 1) % media.length }))
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        setLightbox((s) => ({ ...s, index: (s.index - 1 + media.length) % media.length }))
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightbox.open, media.length])

  useEffect(() => {
    if (!numericId) return
    console.info(`⏳ [NewsDetail] load id=${numericId}`)
    
    // Показываем скелетоны только при первой загрузке
    if (isInitialLoad) {
      setLoading(true)
    }
    
    // Сбрасываем скролл при переходе на страницу новости
    window.scrollTo(0, 0)
    
    RksiApi.getNewsDetail(numericId)
      .then((res) => {
        console.info(`✅ [NewsDetail] loaded id=${numericId}`)
        console.info(`📝 [NewsDetail] paragraphs count: ${res.paragraphs?.length || 0}`)
        if (res.paragraphs) {
          console.info(`📝 [NewsDetail] paragraphs:`, res.paragraphs)
        }
        setData(res)
      })
      .catch((e) => console.error(`❌ [NewsDetail] failed:`, e))
      .finally(() => {
        setLoading(false)
        setIsInitialLoad(false)
      })
  }, [numericId, isInitialLoad])

  if (!numericId) return <div className="container mx-auto px-4 py-8">Неверный идентификатор</div>

  const sanitizedHtml = useMemo(() => {
    if (!data?.contentHtml) return ""
    try {
      const doc = new DOMParser().parseFromString(data.contentHtml, "text/html")
      const root = doc.body
      // Удаляем первый подзаголовок <b>
      const firstBold = root.querySelector("b")
      if (firstBold) firstBold.remove()
      // Удаляем контейнер с изображениями и все img/iframe
      root.querySelectorAll(".img50, img, iframe, hr").forEach((n) => n.remove())
      // НЕ удаляем ссылки <a> - они могут быть важны для контента
      // Возвращаем очищенную разметку с сохранением оформления текста (a/strong/em/ul/ol/li и т.д.)
      return root.innerHTML
    } catch {
      return ""
    }
  }, [data?.contentHtml])

  return (
    <section className="container mx-auto px-4 py-8">
      {loading && isInitialLoad ? (
        <div>
          <Skeleton className="h-9 w-2/3 mb-3" />
          <Skeleton className="h-5 w-3/4 mb-4" />
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-40 rounded-full" />
            <Skeleton className="h-7 w-48 rounded-full" />
          </div>
          
          {/* Контент */}
          <div className="space-y-3 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
          
          {/* Картинки снизу */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3] w-full rounded-md" />
            ))}
          </div>
        </div>
      ) : !data ? (
        <div className="text-center py-8">
          <div className="text-muted-foreground">Не удалось загрузить новость</div>
        </div>
              ) : (
          <article className="transition-opacity duration-200">
          {/* Кнопка "Назад к новостям" */}
          <div className="mb-6">
            <Link
              to="/news"
              state={{ 
                returnPage: sessionStorage.getItem('newsCurrentPage') || '1',
                returnScroll: sessionStorage.getItem('newsScrollPosition') || '0'
              }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4" />
              Назад к новостям
            </Link>
          </div>

          {/* Заголовок */}
          <h1 className="mb-2 text-3xl font-bold">{data.title}</h1>
          {/* Подзаголовок без жирности */}
          {data.subtitle ? (
            <div className="text-base mb-2 text-foreground/90">{data.subtitle}</div>
          ) : null}

          {/* Дата и ссылки */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {data.date ? (
              <div className="text-sm text-muted-foreground">{data.date}</div>
            ) : null}
            {data.links && data.links.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.links.map((l, i) => (
                  <Chip key={`${l.href}-${i}`} href={l.href} text={l.text || l.href} />
                ))}
              </div>
            ) : null}
          </div>

          <Separator className="mb-4"/>

          {/* Контент */}
          <div className="prose rksi-content max-w-none dark:prose-invert">
            {data.paragraphs && data.paragraphs.length > 0 ? (
              // Используем массив параграфов для правильного разделения
              data.paragraphs
                .filter(paragraph => paragraph.trim().length > 0) // Фильтруем пустые параграфы
                .map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0 leading-relaxed">
                    {paragraph}
                  </p>
                ))
            ) : (
              // Fallback на HTML если параграфы недоступны
              <div 
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
                className="[&>p]:mb-4 [&>p:last-child]:mb-0 [&>p]:leading-relaxed"
              />
            )}
          </div>

          {/* Медиа (карусель снизу): фото + iframe */}
          {((data.images && data.images.length > 0) || (data.embeds && data.embeds.length > 0)) ? (
            <div className="mt-8">
              {/* Обёртка для узких экранов: горизонтальный скролл как fallback */}
              <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <Carousel className="w-full">
                  <CarouselContent>
                    {(data.images || []).map((src, index) => (
                      <CarouselItem key={`img-${index}`} className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <div className="p-1">
                          <button
                            className="relative w-full overflow-hidden rounded-md border group"
                            onClick={() => setLightbox({ open: true, index })}
                            aria-label="Открыть изображение"
                          >
                            <img src={src} alt="" className="w-full h-[220px] sm:h-[240px] object-cover" />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        </div>
                      </CarouselItem>
                    ))}

                    {(data.embeds || []).map((src, index) => {
                      // В превью отключаем интерактивность и автоплей
                      const previewSrc = src.replace(/([?&])autoplay=1/g, "$1autoplay=0")
                      const overallIndex = (data.images?.length || 0) + index
                      return (
                      <CarouselItem key={`ifr-${index}`} className="basis-[90%] sm:basis-2/3 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <button
                            className="relative w-full overflow-hidden rounded-md border bg-black group"
                            onClick={() => setLightbox({ open: true, index: overallIndex })}
                            aria-label="Открыть видео"
                          >
                            <div className="aspect-video w-full">
                              <iframe
                                src={previewSrc}
                                className="w-full h-full pointer-events-none"
                                allow="encrypted-media; fullscreen; picture-in-picture;"
                                frameBorder={0}
                              />
                            </div>
                            <div className="absolute inset-0 grid place-items-center">
                              <div className="bg-black/40 rounded-full p-3 opacity-90 group-hover:bg-black/50 transition-colors">
                                <Play className="size-6 text-white" />
                              </div>
                            </div>
                          </button>
                        </div>
                      </CarouselItem>
                      )
                    })}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          ) : null}
        </article>
      )}

      {/* Лайтбокс */}
      <Dialog open={lightbox.open} onOpenChange={(open) => setLightbox((s) => ({ ...s, open }))}>
        <DialogContent showCloseButton={false} className="sm:max-w-[900px] max-h-[90vh]">
          {media.length > 0 ? (
            media[lightbox.index]?.kind === "image" ? (
              <img
                onClick={() => setLightbox((s) => ({ ...s, open: false }))}
                src={media[lightbox.index].src}
                alt=""
                className="h-auto w-full object-contain rounded "
              />
            ) : (
              <div className="w-full">
                <div className="aspect-video w-full">
                  <iframe
                    src={
                      media[lightbox.index].src.includes("?")
                        ? `${media[lightbox.index].src}&autoplay=1`
                        : `${media[lightbox.index].src}?autoplay=1`
                    }
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
                    allowFullScreen
                    frameBorder={0}
                  />
                </div>
              </div>
            )
          ) : null}

          {/* Кнопки навигации в диалоге */}
          {media.length > 1 ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
              <button
                className="pointer-events-auto rounded-full bg-black/50 text-white p-2 hover:bg-black/60 transition"
                onClick={() => setLightbox((s) => ({ ...s, index: (s.index - 1 + media.length) % media.length }))}
                aria-label="Предыдущее"
              >
                ‹
              </button>
              <button
                className="pointer-events-auto rounded-full bg-black/50 text-white p-2 hover:bg-black/60 transition"
                onClick={() => setLightbox((s) => ({ ...s, index: (s.index + 1) % media.length }))}
                aria-label="Следующее"
              >
                ›
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}


