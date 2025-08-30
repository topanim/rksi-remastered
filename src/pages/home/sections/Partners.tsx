import { ExternalLink } from "lucide-react"

type Partner = { name: string; href: string }

const partners: Partner[] = [
  { name: "Министерство цифрового развития ИТ и связи РО", href: "https://minsvyaz.donland.ru/" },
  { name: "Банк «Центр-Инвест»", href: "https://www.centrinvest.ru/" },
  { name: "ПАО «Ростелеком» — Ростовский филиал", href: "https://rostov.rt.ru/" },
  { name: "УФПС Ростовской области", href: "https://www.rostovpost.ru/" },
  { name: "Филиал РТРС «Ростовский ОРТПЦ»", href: "https://rostov.rtrn.ru/" },
  { name: "Союз работодателей Ростовской области", href: "https://www.srro.ru/" },
  { name: "НПП «Гамма»", href: "https://www.nppgamma.ru/" },
  { name: "ГТРК «Дон-ТР»", href: "https://dontr.ru/" },
]

export default function Partners() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-2xl font-semibold">Партнёры РКСИ</h2>
        <a className="text-sm text-primary hover:underline" href="/news/partners">Новости партнёров</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {partners.map((p) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="group rounded-lg border p-4 hover:shadow-sm transition flex items-center justify-between gap-3"
          >
            <span className="leading-snug">
              {p.name}
            </span>
            <ExternalLink className="size-4 text-muted-foreground group-hover:text-foreground shrink-0" />
          </a>
        ))}
      </div>
    </section>
  )
}


