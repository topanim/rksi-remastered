import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { RksiApi, type NewsItem } from "@/api/RksiApi"
import { Skeleton } from "@/components/ui/skeleton"
import { NewsCard } from "@/components/app/NewsCard"

export default function News() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.info(`⏳ [Home.News] load preview page=1`)
    setLoading(true)
    RksiApi.getNews(1)
      .then((res) => {
        console.info(`✅ [Home.News] items=${res.items.length}`)
        setItems(res.items.slice(0, 6))
      })
      .catch((e) => console.error(`❌ [Home.News] failed:`, e))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-semibold">Новости</h2>
        <Link className="text-sm text-primary" to="/news">Все новости</Link>
      </div>
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
        <div className="text-sm text-muted-foreground">🫙 Пока нет новостей для отображения.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      )}
    </section>
  )
}


