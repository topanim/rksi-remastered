export function Footer() {
  return (
    <footer className="mt-8 border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        <div className="opacity-70">© {new Date().getFullYear()} РКСИ</div>
        <div className="flex items-center gap-3">
          <a className="hover:underline" href="https://rksi.ru" target="_blank" rel="noreferrer">Официальный сайт</a>
          <a className="hover:underline" href="https://rksi.ru/contacts" target="_blank" rel="noreferrer">Контакты</a>
        </div>
      </div>
    </footer>
  )
}


