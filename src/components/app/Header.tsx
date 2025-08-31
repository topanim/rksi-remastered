import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
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
        href: "/history",
        isLink: true,
      },
      items: [
        { title: "3D-тур", href: "/tour" },
        { title: "Отзывы и благодарности", href: "/blago" },
        {
          title: "Вакансии колледжа",
          href: "https://trudvsem.ru/company/1026103275440",
        },
        { title: "Конкурентные преимущества", href: "/priority" },
        { title: "Попечительский совет", href: "/pops" },
        { title: "Взаимодействие с ВУЗами", href: "/starfsmenntun" },
        { title: "Демонстрационный экзамен", href: "/demo_exam" },
        { title: "Наставничество в РКСИ", href: "/mentorship" },
        { title: "Международное сотрудничество", href: "/international" },
        { title: "Научно-исследовательская работа", href: "/nir" },
        
        {
          title: "Национальный проект «Образование»",
          href: "/young_professionals",
        },
        { title: "Социальное партнерство", href: "/social" },
        { title: "Контакты", href: "/contacts" },
      ],
    },
    {
      title: "Студенту",
      mainItem: {
        title: "Расписания",
        description: "Актуальные расписания занятий и экзаменов",
        href: "/schedule",
        isLink: true,
      },
      items: [
        { title: "Работа РКСИ в режиме оn-line", href: "/online_edu" },
        { title: "Образовательные программы", href: "/sveden/education" },
        { title: "Кабинет студента", href: "/account" },
        {
          title: "Связь с преподавателями",
          href: "https://docs.google.com/spreadsheets/d/1TYqoU3pGHd_u1UWjHV5TaHKOZr_d3nYG1MG0cVKye3Q/view#gid=1185239252",
        },
        { title: "Движение Первых", href: "/movement_of_the_first" },
        { title: "Учебные сборы", href: "/military" },
        { title: "Отделения", href: "/faculties" },
        { title: "Библиотека колледжа", href: "/librery" },
        { title: "Оплата обучения", href: "/prise" },
        { title: "Образовательные кредиты", href: "/loans" },
        { title: "Полезная информация", href: "/useful_info" },
        { title: "Как восстановить пропуск?", href: "/access_control" },
        { title: "Спортивный клуб", href: "/sports_club" },
        { title: "Творческие студии", href: "/creative_studios" },
        { title: "Медиастудия РКСИ", href: "//mediapark.rksi.ru/" },
        { title: "Научное общество", href: "/sno" },
        { title: "Учебные материалы", href: "/materials" },
        { title: "Производственная практика", href: "/praktica" },
        { title: "Сетевые электронные библиотеки", href: "/netlibs" },
        {
          title: "Памятка обучающемуся по организации целевого обучения",
          href: "/rksi/doc/targeted/student.pdf",
        },
      ],
    },
    {
      title: "Абитуриенту",
      mainItem: {
        title: "Приём в РКСИ",
        description: "Вся информация для поступающих в колледж",
        href: "/priem",
        isLink: true,
      },
      items: [
        { title: "Кабинет абитуриента", href: "/cabinet" },
        { title: "Количество заявлений, проходной балл", href: "/countlist" },
        { title: "Специальности для поступления", href: "/admission" },
        { title: "Подготовительные курсы", href: "/podkursi" },
        { title: "Общежития", href: "/dorms" },
        { title: "Воскресная школа информатики", href: "/ito_school" },
        { title: "Образовательный кредит", href: "/credit" },
        {
          title: "Памятка абитуриенту по организации целевого обучения",
          href: "/rksi/doc/targeted/abiturient.pdf",
        },
        {
          title: "Летний мини-лагерь «IT-фабрика компьютерных гениев!»",
          href: "https://it-factory.rksi.ru/",
        },
        {
          title: "Приказы о зачислении и cписки зачисленных в РКСИ",
          href: "/newstudentlist",
        }
      ],
    },
  ],
  additionalSections: [
    {
      title: "На базе РКСИ",
      items: [
        {
          title: "Чемпионат по профессиональному мастерству «Профессионалы»",
          href: "/professionals2025",
        },
        {
          title: "Региональный этап чемпионата высоких технологий",
          href: "/high_technology2025",
        },
        { title: "Хакатон «IT Tech»", href: "/it_tech2024" },
        {
          title: "Региональная олимпиада профессионального мастерства",
          href: "/olimpiada2025",
        },
        {
          title:
            "Областной фестиваль «Моя будущая профессия – специалист в области ИТ и телекоммуникаций»",
          href: "/festival2024",
        },
        {
          title: "День среднего профессионального образования",
          href: "/spo2023",
        },
        {
          title: "Региональный этап Всероссийского конкурса «Мастер года»",
          href: "/master_goda2025",
        },
        {
          title: "Патриотический слёт «Вместе за правду»",
          href: "/together_for_the_truth2024",
        },
        {
          title: "Конкурсы профессионального мастерства педагогов",
          href: "/concurses",
        },
        { title: "IT-фабрика", href: "https://it-factory.rksi.ru/" },
        { title: "Музей РКСИ", href: "/museum" },
      ],
    },
    {
      title: "Учебные центры",
      items: [
        {
          title:
            "Региональный отраслевой ресурсный центр информационных технологий и телекоммуникаций",
          href: "http://rc.rksi.ru",
        },
        { title: "Сетевая академия Cisco", href: "/cisco" },
        { title: "Сервисная академия Samsung", href: "/samsung" },
        { title: "Академия Mikrotik", href: "/mikrotik" },
        {
          title: "Авторизованный учебный центр «Базальт СПО»",
          href: "/basealt",
        },
        {
          title: "Авторизованный учебно-практический центр NIKOMAX",
          href: "/nikomax",
        },
      ],
    },
    {
      title: "Родителям",
      items: [
        {
          title: "Предотвращение вовлечения подростков в совершение диверсий",
          href: "/no_diversity",
        },
        {
          title: "Об особенностях развития детей и подростков",
          href: "https://drive.google.com/file/d/1HgHm69e7rz2sZl0uIRqaHaEoJJoKPpTS/view",
        },
        {
          title: "Как пожаловаться на противоправные материалы?",
          href: "/rksi/doc/safety/yabedavk.pdf?t=88a0ee53faa2b9ed",
        },
        {
          title: "Как выявить вовлечённость в «Группы смерти»?",
          href: "/rksi/doc/safety/pamyatka_group.pdf?t=88a0ee53faa2b9ed",
        },
        {
          title: "Безопасность в сети",
          href: "/rksi/doc/klr/safety3.pdf?t=88a0ee53faa2b9ed",
        },
        {
          title: "Безопасность детей в интернете. Возраст и этапы развития",
          href: "https://drive.google.com/file/d/14muXoOBL62kvp-_8HSDcMDO-maon8_lU/view?usp=share_link",
        },
        {
          title: "Как распознать мошенничество в сети",
          href: "https://drive.google.com/file/d/1YTpazPbECEGrpGnBJCDF31nZnYHspQK1/view?usp=share_link",
        },
      ],
    },
    {
      title: "Преподавателям",
      items: [
        { title: "Документация", href: "/locals#teacher" },
        { title: "Классному руководителю", href: "/class" },
        { title: "Кабинет классного руководителя", href: "/class_leader" },
        { title: "Архив расписания", href: "/schedule_archive" },
        { title: "Наставничество в РКСИ", href: "/mentorship" },
        { title: "Аттестация педагогических работников", href: "/attestation" },
        {
          title: "Коронавирус: что делать?",
          href: "http://rksi.ru/infection#corona",
        },
        { title: "Заказ учебников", href: "/librery#zakaz" },
        {
          title: "Полезные каналы коммуникации в сфере образования",
          href: "/good_channels",
        },
        { title: "Методические разработки", href: "/methodika" },
      ],
    },
    {
      title: "Полезное",
      items: [
        { title: "Трудоустройство", href: "/employment" },
        {
          title: "Полезные каналы коммуникации в сфере образования",
          href: "/good_channels",
        },
        { title: "Защита детей в цифровой среде", href: "/scam" },
        { title: "Здоровый образ жизни", href: "/health" },
        {
          title: "Оказание бесплатной юридической помощи",
          href: "http://rksi.ru/doc/gosuslugi/freejustition.doc",
        },
        {
          title: "Как вести себя при атаке БПЛА",
          href: "/rksi/doc/safety/bpla.pdf",
        },
        {
          title: "Профилактика правонарушений в сети Интернет",
          href: "https://drive.google.com/file/d/1k51X5lnYyQXdNLBqQ7XNbdimOaoY-6wa/view?usp=sharing",
        },
        { title: "Нет наркотикам!", href: "/stop_drags" },
        { title: "Профилактика инфекций", href: "/infection" },
        { title: "Безопасность жизнедеятельности", href: "/safety" },
        { title: "Информационная безопасность", href: "/netsafety" },
        { title: "Государственные услуги", href: "/gosuslugi" },
      ],
    },
    {
      title: "Наши победы",
      items: [
        { title: "Олимпиады, конкурсы, конференции, выставки", href: "/olimp" },
        { title: "Знаменитые выпускники", href: "/names" },
        { title: "Наша гордость", href: "/honor_board" },
        { title: "Лучшие студенты", href: "/best_students2024" },
        { title: "Лучшая группа", href: "/best_groop" },
        { title: "Спортивные победы", href: "/sport" },
      ],
    },
    {
      title: "Новости",
      items: [
        { title: "Новости", href: "/news" },
        { title: "Дни открытых дверей", href: "/open_days" },
        { title: "СМИ о нас", href: "/news/smi" },
        { title: "РКСИ-ТВ", href: "/videonews" },
        { title: "Газета колледжа «Аська.NET»", href: "/aska-net" },
      ],
    },
    {
      title: "Мы помним",
      items: [
        { title: "Великая Победа", href: "/victory80" },
        { title: "Лица Героев", href: "/svo" },
        { title: "Музей РКСИ", href: "/museum" },
      ],
    },
    {
      title: "Психологическая служба",
      items: [
        { title: "Служба доверия", href: "/trust_service" },
        { title: "Психологи колледжа", href: "/psychological_service" },
      ],
    },
    {
      title: "Обратная связь",
      items: [
        { title: "Контакты", href: "/contacts" },
        {
          title: "Обращение (Госуслуги)",
          href: "https://pos.gosuslugi.ru/form/?opaId=233059&fz59=false",
        },
      ],
    },
    {
      title: "Выпускнику",
      items: [{ title: "Трудоустройство", href: "/employment" }],
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
      {section.items.map((item: any, index: number) => {
        // Проверяем, является ли ссылка внутренней (начинается с /)
        const isInternalLink =
          item.href.startsWith("/") && !item.href.startsWith("//");

        return isInternalLink ? (
          <Link
            key={index}
            className="text-sm rounded-md p-2 hover:bg-accent h-min"
            to={item.href}
          >
            {item.title}
          </Link>
        ) : (
          <a
            key={index}
            className="text-sm rounded-md p-2 hover:bg-accent h-min"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.title}
          </a>
        );
      })}
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
                            section.mainItem.isLink
                              ? section.mainItem.href
                              : "#"
                          }
                        >
                          <div className="text-xs opacity-80 mb-1">Главное</div>
                          <div className="text-sm">
                            {section.mainItem.title}
                          </div>
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
                        {section.items.map((item, itemIndex) => {
                          const isInternalLink =
                            item.href.startsWith("/") &&
                            !item.href.startsWith("//");

                          return isInternalLink ? (
                            <Link
                              key={itemIndex}
                              className="block text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md px-2 py-1.5 transition-all duration-200 hover:translate-x-1"
                              to={item.href}
                            >
                              {item.title}
                            </Link>
                          ) : (
                            <a
                              key={itemIndex}
                              className="block text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md px-2 py-1.5 transition-all duration-200 hover:translate-x-1"
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.title}
                            </a>
                          );
                        })}
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
                      {section.items.map((item, itemIndex) => {
                        const isInternalLink =
                          item.href.startsWith("/") &&
                          !item.href.startsWith("//");

                        return isInternalLink ? (
                          <Link
                            key={itemIndex}
                            className="block text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md px-2 py-1.5 transition-all duration-200 hover:translate-x-1"
                            to={item.href}
                          >
                            {item.title}
                          </Link>
                        ) : (
                          <a
                            key={itemIndex}
                            className="block text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md px-2 py-1.5 transition-all duration-200 hover:translate-x-1"
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.title}
                          </a>
                        );
                      })}
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
        <NavigationMenu className="hidden lg:flex" delayDuration={300}>
          <NavigationMenuList>
            {/* Основные разделы */}
            {navigationData.mainSections.map((section, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 grid-rows-4 gap-2 p-2 w-[820px]">
                    <MainSectionItem
                      item={section.mainItem}
                      isLink={section.mainItem.isLink}
                      className="row-span-4"
                    />
                    {section.items.map((item, itemIndex) => {
                      const isInternalLink =
                        item.href.startsWith("/") &&
                        !item.href.startsWith("//");

                      return isInternalLink ? (
                        <Link
                          key={itemIndex}
                          to={item.href}
                          className="rounded-md p-2 hover:bg-accent block"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <a
                          key={itemIndex}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-md p-2 hover:bg-accent block"
                        >
                          {item.title}
                        </a>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}

            {/* Раздел "Ещё" */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Ещё</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid grid-cols-3 auto-rows-min gap-2 p-4 w-[720px]">
                  {navigationData.additionalSections.map((section, index) => (
                    <div key={index}>
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
