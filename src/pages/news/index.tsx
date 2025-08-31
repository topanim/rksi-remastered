import { useEffect, useState } from "react"
import { RksiApi, type NewsItem } from "@/api/RksiApi"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams, useLocation } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { NewsCard } from "@/components/app/NewsCard"

export default function NewsPage() {
  const [params, setParams] = useSearchParams()
  const location = useLocation()
  const page = Number(params.get("page") || 1)
  const [items, setItems] = useState<NewsItem[]>([])
  const [hasPrev, setHasPrev] = useState(false)
  const [hasNext, setHasNext] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  // Обработка возврата с детальной страницы
  useEffect(() => {
    if (location.state?.returnPage && location.state?.returnScroll) {
      const returnPage = location.state.returnPage
      const returnScroll = parseInt(location.state.returnScroll)
      
      // Если нужно перейти на другую страницу
      if (returnPage !== page.toString()) {
        setParams({ page: returnPage })
      }
      
      // Плавно восстанавливаем позицию скролла
      setTimeout(() => {
        const currentPosition = window.scrollY
        const distance = returnScroll - currentPosition
        const duration = 300 // 300ms для плавного перехода
        const startTime = performance.now()
        
        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Функция плавности (ease-out)
          const easeOut = 1 - Math.pow(1 - progress, 3)
          
          const newPosition = currentPosition + (distance * easeOut)
          window.scrollTo(0, newPosition)
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll)
          }
        }
        
        // Запускаем анимацию на следующем кадре
        requestAnimationFrame(animateScroll)
      }, 100)
      
      // Очищаем state
      window.history.replaceState({}, '', window.location.pathname + window.location.search)
    }
  }, [location.state, page, setParams])

  useEffect(() => {
    console.info(`⏳ [NewsPage] load page=${page}`)
    setLoading(true)
    RksiApi.getNews(page)
      .then((res) => {
        console.info(`✅ [NewsPage] items=${res.items.length} totalPages=${res.totalPages}`)
        setItems(res.items)
        setHasPrev(res.hasPrev)
        setHasNext(res.hasNext)
        setTotalPages(res.totalPages)
        // Prefetch соседних страниц
        RksiApi.prefetchNewsPages(res.page, res.hasPrev, res.hasNext)
        
        // Восстанавливаем позицию скролла, если пользователь возвращается с детальной страницы
        const savedScrollPosition = sessionStorage.getItem('newsScrollPosition')
        if (savedScrollPosition) {
          // Устанавливаем таймаут, чтобы контент успел отрендериться
          setTimeout(() => {
            window.scrollTo(0, parseInt(savedScrollPosition))
            // Очищаем сохраненную позицию
            sessionStorage.removeItem('newsScrollPosition')
          }, 100)
        }
      })
      .catch((e) => {
        console.error(`❌ [NewsPage] failed:`, e)
      })
      .finally(() => setLoading(false))
  }, [page])

  // Обработка кнопки "Назад" браузера
  useEffect(() => {
    const handlePopState = () => {
      // При навигации назад восстанавливаем позицию скролла
      const savedScrollPosition = sessionStorage.getItem('newsScrollPosition')
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition))
          sessionStorage.removeItem('newsScrollPosition')
        }, 100)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Генерация номеров страниц для пагинации
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5 // Максимальное количество видимых номеров страниц
    
    if (totalPages <= maxVisible) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Если страниц много, показываем умную пагинацию
      if (page <= 3) {
        // В начале: 1, 2, 3, 4, 5, ..., totalPages
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        if (totalPages > 5) {
          pages.push("...")
          pages.push(totalPages)
        }
      } else if (page >= totalPages - 2) {
        // В конце: 1, ..., totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // В середине: 1, ..., page-1, page, page+1, ..., totalPages
        pages.push(1)
        pages.push("...")
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Новости</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <Skeleton className="aspect-video rounded-md mb-3" />
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-sm text-muted-foreground">🫙 Список новостей пуст. Попробуйте обновить страницу или открыть позднее.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-200">
            {items.map((n) => (
              <NewsCard 
                key={n.id} 
                item={n}
                onClick={() => {
                  // Сохраняем позицию скролла и текущую страницу
                  sessionStorage.setItem('newsScrollPosition', window.scrollY.toString())
                  sessionStorage.setItem('newsCurrentPage', page.toString())
                }}
              />
            ))}
          </div>
          
          {/* Полная пагинация */}
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                {/* Кнопка "Назад" */}
                <PaginationItem>
                  <PaginationPrevious
                    className={!hasPrev ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    onClick={() => {
                      if (hasPrev) {
                        // Сохраняем позицию скролла перед сменой страницы
                        sessionStorage.setItem('newsScrollPosition', window.scrollY.toString())
                        setParams({ page: String(page - 1) })
                      }
                    }}
                  />
                </PaginationItem>

                {/* Номера страниц */}
                {getPageNumbers().map((pageNum, index) => (
                  <PaginationItem key={index}>
                    {pageNum === "..." ? (
                      <span className="px-3 py-2 text-muted-foreground">...</span>
                    ) : (
                                              <PaginationLink
                          isActive={pageNum === page}
                          onClick={() => {
                            // Сохраняем позицию скролла перед сменой страницы
                            sessionStorage.setItem('newsScrollPosition', window.scrollY.toString())
                            setParams({ page: String(pageNum) })
                          }}
                          className="cursor-pointer"
                        >
                        {pageNum}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                {/* Кнопка "Вперёд" */}
                <PaginationItem>
                  <PaginationNext
                    className={!hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    onClick={() => {
                      if (hasNext) {
                        // Сохраняем позицию скролла перед сменой страницы
                        sessionStorage.setItem('newsScrollPosition', window.scrollY.toString())
                        setParams({ page: String(page + 1) })
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            {/* Информация о страницах */}
            <div className="text-center text-sm text-muted-foreground mt-2">
              Страница {page} из {totalPages}
            </div>
          </div>
        </>
      )}
    </section>
  )
}


