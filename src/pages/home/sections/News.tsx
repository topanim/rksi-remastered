import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { RksiApi, type NewsItem } from "@/api/RksiApi"
import { Skeleton } from "@/components/ui/skeleton"

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
            <Link key={n.id} to={`/news/${n.id}`} className="rounded-lg border p-4 hover:shadow-sm transition-shadow">
              <div className="aspect-video rounded-md bg-muted mb-3 overflow-hidden">
                {n.image ? <img src={n.image} alt="" className="w-full h-full object-cover" /> : null}
              </div>
              <div className="text-xs text-muted-foreground">{n.date}</div>
              <h3 className="font-medium mt-1">{n.title}</h3>
              {n.excerpt ? <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{n.excerpt}</p> : null}
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}


