const contacts = [
  {
    title: "Приемная директора",
    items: [
      { label: "Тел.", value: "+7 (863) 206-88-88, доб. 2032" },
      { label: "Телефон", value: "+7 (863) 267-58-26" },
      { label: "e-mail", value: "rksi@rostobr.ru", href: "mailto:rksi@rostobr.ru" },
    ],
  },
  {
    title: "Приемная комиссия",
    items: [
      { label: "Тел.", value: "+7 (863) 206-88-88, доб. 1061" },
    ],
  },
  {
    title: "Подготовительные курсы",
    items: [
      { label: "Тел.", value: "+7 (863) 206-88-88, доб. 3091" },
    ],
  },
]

export default function Contacts() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Контакты</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {contacts.map((c) => (
            <div key={c.title} className="rounded-lg border p-4">
              <div className="font-medium mb-2">{c.title}</div>
              <div className="grid gap-1 text-sm">
                {c.items.map((it, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="text-muted-foreground min-w-32">{it.label}:</div>
                    {it.href ? (
                      <a className="text-primary hover:underline" href={it.href}>{it.value}</a>
                    ) : (
                      <span>{it.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border overflow-hidden min-h-72">
          <iframe
            title="Карта РКСИ"
            src="https://yandex.com/map-widget/v1/?um=constructor%3A4de1aedaab255bf64e86c3623901ef86fa6ba2ff38f0412758bd9c41f957757c&amp;source=constructor"
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </div>
      </div>
    </section>
  )
}


