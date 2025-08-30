import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Moon,
  Sun,
  Search,
  Phone,
  Mail,
  Send,
  Globe,
  Menu,
  ChevronRight,
  GraduationCap,
  Users,
  UserCheck,
  Newspaper,
  Heart,
  BookOpen,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Структура навигации
const navigationData = {
  mainSections: [
    {
      title: "О колледже",
      mainItem: {
        title: "История и традиции",
        description: "Узнайте о богатой истории и традициях РКСИ",
        href: "https://rksi.ru",
        isLink: false,
      },
      items: [
        { title: "Руководство", href: "#" },
        { title: "Педагогический состав", href: "#" },
        { title: "Социальное партнёрство", href: "#" },
        { title: "3D-тур", href: "#" },
        { title: "Отзывы и благодарности", href: "#" },
        { title: "Вакансии колледжа", href: "#" },
        { title: "Конкурентные преимущества", href: "#" },
        { title: "Международное сотрудничество", href: "#" },
        { title: "Попечительский совет", href: "#" },
        { title: "Взаимодействие с ВУЗами", href: "#" },
        { title: "Научно-исследовательская работа", href: "#" },
        { title: "Демонстрационный экзамен", href: "#" },
        { title: "Наставничество в РКСИ", href: "#" },
        { title: "Национальный проект «Образование»", href: "#" },
      ],
    },
    {
      title: "Студенту",
      mainItem: {
        title: "Расписания",
        description: "Актуальные расписания занятий и экзаменов",
        href: "/student",
        isLink: true,
      },
      items: [
        { title: "Кабинет студента", href: "#" },
        { title: "Образовательные программы", href: "#" },
        { title: "Учебные материалы", href: "#" },
        { title: "Работа РКСИ в режиме online", href: "#" },
        { title: "Связь с преподавателями", href: "#" },
        { title: "Движение Первых", href: "#" },
        { title: "Учебные сборы", href: "#" },
        { title: "Отделения", href: "#" },
        { title: "Библиотека колледжа", href: "#" },
        { title: "Сетевые электронные библиотеки", href: "#" },
        { title: "Оплата обучения", href: "#" },
        { title: "Образовательные кредиты", href: "#" },
        { title: "Как восстановить пропуск?", href: "#" },
        { title: "Спортивный клуб", href: "#" },
        { title: "Творческие студии", href: "#" },
        { title: "Медиастудия РКСИ", href: "#" },
        { title: "Научное общество", href: "#" },
        { title: "Производственная практика", href: "#" },
      ],
    },
    {
      title: "Абитуриенту",
      mainItem: {
        title: "Приём в РКСИ",
        description: "Вся информация для поступающих в колледж",
        href: "/entrant",
        isLink: true,
      },
      items: [
        { title: "Количество заявлений", href: "#" },
        { title: "Специальности", href: "#" },
        { title: "Подготовительные курсы", href: "#" },
        { title: "Кабинет абитуриента", href: "#" },
        { title: "Приказы о зачислении", href: "#" },
        { title: "Проходной балл", href: "#" },
        { title: "Воскресная школа информатики", href: "#" },
        { title: "Образовательный кредит", href: "#" },
        { title: "Летний мини-лагерь «IT-фабрика»", href: "#" },
        { title: "Общежития", href: "#" },
      ],
    },
  ],
  additionalSections: [
    {
      title: "Новости",
      items: [
        { title: "Лента новостей", href: "/news" },
        { title: "РКСИ-ТВ", href: "#" },
        { title: "Газета «Аська.NET»", href: "#" },
        { title: "Дни открытых дверей", href: "#" },
        { title: "СМИ о нас", href: "#" },
      ],
    },
    {
      title: "Родителям",
      items: [
        { title: "Предотвращение вовлечения подростков", href: "#" },
        { title: "Особенности развития детей", href: "#" },
        { title: "Как пожаловаться на противоправные материалы?", href: "#" },
        { title: "Как выявить вовлечённость в «Группы смерти»?", href: "#" },
        { title: "Безопасность в сети", href: "#" },
        { title: "Безопасность детей в интернете", href: "#" },
        { title: "Как распознать мошенничество в сети", href: "#" },
      ],
    },
    {
      title: "Преподавателям",
      items: [
        { title: "Документация", href: "#" },
        { title: "Классному руководителю", href: "#" },
        { title: "Кабинет классного руководителя", href: "#" },
        { title: "Архив расписания", href: "#" },
        { title: "Наставничество в РКСИ", href: "#" },
        { title: "Аттестация педагогических работников", href: "#" },
        { title: "Заказ учебников", href: "#" },
        { title: "Методические разработки", href: "#" },
      ],
    },
    {
      title: "Дополнительно",
      items: [
        { title: "Партнёры", href: "#" },
        { title: "Вакансии", href: "#" },
        { title: "Контакты", href: "#" },
        { title: "Карта сайта", href: "#" },
        { title: "Электронная библиотека", href: "#" },
        { title: "Виртуальный тур", href: "#" },
        { title: "Медиацентр", href: "#" },
        { title: "Обратная связь", href: "#" },
      ],
    },
    {
      title: "Выпускнику",
      items: [{ title: "Трудоустройство", href: "#" }],
    },
  ],
};

// Компонент для рендера основного раздела
const MainSectionItem = ({
  item,
  isLink,
  className = "",
}: {
  item: any;
  isLink: boolean;
  className?: string;
}) => {
  const content = (
    <div className="relative rounded-md p-3 h-full flex flex-col justify-between overflow-hidden group">
      {/* Анимированный градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#36D1DC] to-[#5B86E5] bg-[length:200%_200%] animate-gradient-x"></div>
      
      {/* Дополнительный слой с переливанием */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
      
      {/* Контент */}
      <div className="relative z-10 h-full text-white flex flex-col justify-between">
        <div className="text-sm opacity-70 mb-1">Главное</div>
        <div className="mb-2">
          <div className="text-base font-medium">{item.title}</div>
          <div className="text-sm opacity-70 mt-2">{item.description}</div>
        </div>
      </div>
      
      {/* Декоративные элементы */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  );

  return isLink ? (
    <Link to={item.href} className={`block h-full ${className}`}>
      {content}
    </Link>
  ) : (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className={`block h-full ${className}`}
    >
      {content}
    </a>
  );
};

// Компонент для рендера дополнительного раздела
const AdditionalSectionItem = ({ section }: { section: any }) => (
  <div className="h-min">
    <div className="text-sm text-muted-foreground mb-2">{section.title}</div>
    <div className="flex flex-col">
      {section.items.map((item: any, index: number) => (
        <a
          key={index}
          className="text-sm rounded-md p-2 hover:bg-accent h-min" // Добавлен h-min
          href={item.href}
        >
          {item.title}
        </a>
      ))}
    </div>
  </div>
);

export function Header() {
  const [dark, setDark] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = encodeURIComponent(searchQuery.trim());
      window.open(
        `https://yandex.ru/search/?text=${query}&site=rksi.ru`,
        "_blank"
      );
    }
  };

  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        {/* Мобильный бургер */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="size-9 inline-grid place-items-center rounded-md border hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px]">
              <SheetHeader className="pb-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-gradient-to-tl from-[#36D1DC] to-[#5B86E5] rounded-md flex items-center justify-center text-white font-bold text-sm">
                    Р
                  </div>
                  РКСИ
                </SheetTitle>
              </SheetHeader>
              <nav className="mx-3 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
                {/* Основные разделы */}
                {navigationData.mainSections.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground mb-3 px-1 flex items-center gap-2">
                      {index === 0 && <GraduationCap className="size-4" />}
                      {index === 1 && <Users className="size-4" />}
                      {index === 2 && <UserCheck className="size-4" />}
                      {section.title}
                    </div>
                    <div className="space-y-2">
                      {/* Главный подраздел */}
                      <div className="relative rounded-lg p-3 mb-3 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] overflow-hidden group">
                        {/* Анимированный градиентный фон */}
                        <div className="absolute inset-0 bg-gradient-to-tl from-[#36D1DC] to-[#5B86E5] bg-[length:200%_200%] animate-gradient-x"></div>
                        
                        {/* Дополнительный слой с переливанием */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
                        
                        <Link
                          className="relative z-10 block text-white font-medium hover:opacity-90 transition-opacity"
                          to={
                            section.mainItem.isLink ? section.mainItem.href : "#"
                          }
                        >
                          <div className="text-xs opacity-80 mb-1">Главное</div>
                          <div className="text-sm">{section.mainItem.title}</div>
                          <div className="text-xs opacity-80 mt-2">
                            {section.mainItem.description}
                          </div>
                        </Link>
                        
                        {/* Декоративные элементы */}
                        <div className="absolute top-2 right-2 w-6 h-6 bg-white/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 bg-white/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      {/* Остальные подразделы */}
                      <div className="space-y-1 pl-3">
                        {section.items.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            className="block text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md px-2 py-1.5 transition-all duration-200 hover:translate-x-1"
                            href={item.href}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Разделитель */}
                <div className="border-t border-border pt-4">
                  <div className="text-xs font-medium text-muted-foreground mb-4 px-1 flex items-center gap-2">
                    <MoreHorizontal className="size-4" />
                    Дополнительные разделы
                  </div>
                </div>
                
                {/* Дополнительные разделы */}
                {navigationData.additionalSections.map((section, index) => (
                  <div key={index} className="space-y-3">
                    <div className="text-sm font-medium text-muted-foreground mb-2 px-1 flex items-center gap-2">
                      {index === 0 && <Newspaper className="size-4" />}
                      {index === 1 && <Heart className="size-4" />}
                      {index === 2 && <BookOpen className="size-4" />}
                      {index === 3 && <MoreHorizontal className="size-4" />}
                      {index === 4 && <GraduationCap className="size-4" />}
                      {section.title}
                    </div>
                    <div className="space-y-1 pl-3">
                      {section.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          className="block text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md px-2 py-1.5 transition-all duration-200 hover:translate-x-1"
                          href={item.href}
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <Link to="/" className="text-primary font-bold">
          РКСИ
        </Link>

        {/* Десктопная навигация */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Основные разделы */}
            {navigationData.mainSections.map((section, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 grid-rows-4 gap-2 p-2 w-[800px]">
                    <MainSectionItem
                      item={section.mainItem}
                      isLink={section.mainItem.isLink}
                      className="row-span-4"
                    />
                    {section.items.map((item, itemIndex) => (
                      <NavigationMenuLink
                        key={itemIndex}
                        href={item.href}
                        className="rounded-md p-2 hover:bg-accent"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}

            {/* Раздел "Ещё" */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Ещё</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-2 auto-rows-min gap-4 p-4 w-[600px]">
                  {navigationData.additionalSections.map((section, index) => (
                    <div key={index} className="break-inside-avoid">
                      {" "}
                      {/* Важно! */}
                      <AdditionalSectionItem section={section} />
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto hidden md:flex items-center gap-2">
          <div className="relative w-64">
            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Поиск по сайту"
                className="pl-9 pr-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground hover:text-foreground"
              >
                <ChevronRight className="size-4" />
              </button>
            </form>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://vk.com/rksi_ru"
              target="_blank"
              rel="noreferrer"
              className="size-9 grid place-items-center rounded-md border"
            >
              <Send className="size-4" />
            </a>
            <a
              href="https://t.me/rksi_ru"
              target="_blank"
              rel="noreferrer"
              className="size-9 grid place-items-center rounded-md border"
            >
              <Globe className="size-4" />
            </a>
            <a
              href="mailto:info@rksi.ru"
              className="size-9 grid place-items-center rounded-md border"
            >
              <Mail className="size-4" />
            </a>
            <a
              href="tel:+78632700323"
              className="size-9 grid place-items-center rounded-md border"
            >
              <Phone className="size-4" />
            </a>
          </div>
          <Toggle
            aria-label="Переключатель темы"
            onPressedChange={setDark}
            className="size-9"
          >
            {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Toggle>
        </div>

        {/* Мобильные элементы справа */}
        <div className="ml-auto md:hidden flex items-center gap-2">
          <button className="size-9 inline-grid place-items-center rounded-md border hover:bg-accent/50 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <Search className="size-4" />
          </button>
          <Toggle
            aria-label="Переключатель темы"
            onPressedChange={setDark}
            className="size-9"
          >
            {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Toggle>
        </div>
      </div>
    </header>
  );
}
