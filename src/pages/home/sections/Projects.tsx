type ProjectTile = {
  bg: string
  logo: string
  href: string
  alt: string
}

const rows: ProjectTile[][] = [
  [
    {
      bg: "https://www.rksi.ru/img/rksi/coppbg.jpg",
      logo: "https://www.rksi.ru/img/rksi/logocopp.svg",
      href: "http://copp161.ru",
      alt: "ЦОПП",
    },
    {
      bg: "https://www.rksi.ru/img/rksi/rcbg.jpg",
      logo: "https://www.rksi.ru/img/rksi/rc-logo.svg",
      href: "http://rc.rksi.ru",
      alt: "Ресурсный центр",
    },
  ],
  [
    {
      bg: "https://www.rksi.ru/img/rksi/mediabg.jpg",
      logo: "https://www.rksi.ru/img/rksi/logo_ms.svg",
      href: "http://mediapark.rksi.ru/",
      alt: "Медиапарк РКСИ",
    },
    {
      bg: "https://www.rksi.ru/img/rksi/itbg.jpg",
      logo: "https://www.rksi.ru/img/rksi/logoit.svg",
      href: "https://it-factory.rksi.ru",
      alt: "IT-фабрика",
    },
  ],
]

export default function Projects() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Наши проекты</h2>
      <div className="space-y-4">
        {rows.map((pair, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pair.map((tile, i) => (
              <div
                key={i}
                className="relative rounded-lg overflow-hidden border bg-center bg-cover min-h-[180px] sm:min-h-[220px]"
                style={{ backgroundImage: `url(${tile.bg})` }}
              >
                <a
                  href={tile.href}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 grid place-items-center p-4 bg-black/10 hover:bg-black/20 transition-colors"
                >
                  <img src={tile.logo} alt={tile.alt} className="max-h-20 sm:max-h-24 object-contain" />
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}


