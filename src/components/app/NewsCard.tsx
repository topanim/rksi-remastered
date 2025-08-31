import { Link } from "react-router-dom"
import type { NewsItem } from "@/api/RksiApi"

interface NewsCardProps {
  item: NewsItem
  onClick?: () => void
  className?: string
}

export function NewsCard({ item, onClick, className = "" }: NewsCardProps) {
  return (
    <Link 
      to={`/news/${item.id}`} 
      onClick={onClick}
      className={`rounded-lg border p-4 hover:shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${className}`}
    >
      <div className="aspect-video rounded-md bg-muted mb-3 overflow-hidden">
        {item.image ? (
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        ) : null}
      </div>
      <div className="text-xs text-muted-foreground">{item.date}</div>
      <h3 className="font-medium mt-1">{item.title}</h3>
      {item.excerpt ? <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{item.excerpt}</p> : null}
    </Link>
  )
}
