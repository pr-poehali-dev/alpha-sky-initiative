import Icon from "@/components/ui/icon";

const quickServices = [
  { icon: "BedDouble", label: "Отели", color: "bg-blue-100 text-blue-600" },
  { icon: "UserCheck", label: "Гиды", color: "bg-orange-100 text-orange-600" },
  { icon: "Map", label: "Туры", color: "bg-green-100 text-green-600" },
  { icon: "Car", label: "Трансфер", color: "bg-purple-100 text-purple-600" },
  { icon: "Plane", label: "Билеты", color: "bg-cyan-100 text-cyan-600" },
  { icon: "Utensils", label: "Рестораны", color: "bg-red-100 text-red-600" },
  { icon: "Shield", label: "Страховка", color: "bg-yellow-100 text-yellow-600" },
  { icon: "Backpack", label: "Снаряжение", color: "bg-pink-100 text-pink-600" },
];

const destinations = [
  { name: "Тбилиси", country: "Грузия", emoji: "🇬🇪", temp: "22°", tag: "Популярное" },
  { name: "Стамбул", country: "Турция", emoji: "🇹🇷", temp: "27°", tag: "Горящее" },
  { name: "Барселона", country: "Испания", emoji: "🇪🇸", temp: "25°", tag: "Топ" },
];

const reviews = [
  { name: "Мария К.", text: "Нашла гида за 5 минут. Тбилиси открылся с новой стороны!", rating: 5, avatar: "М" },
  { name: "Алексей П.", text: "Маршрут по Италии — просто огонь. Всё чётко и удобно.", rating: 5, avatar: "А" },
];

interface HomeScreenProps {
  onOpenChat: () => void;
}

export default function HomeScreen({ onOpenChat }: HomeScreenProps) {
  return (
    <div className="pb-4">
      {/* Hero-шапка */}
      <div className="relative h-52 overflow-hidden">
        <img
          src="/images/mountain-landscape.jpg"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/80 text-xs uppercase tracking-widest mb-1">Добро пожаловать</p>
          <h1 className="text-white text-2xl font-bold">Куда летим? ✈️</h1>
        </div>
        {/* Кнопка чата */}
        <button
          onClick={onOpenChat}
          className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer"
        >
          <Icon name="MessageCircle" size={18} className="text-white" />
        </button>
      </div>

      {/* Поиск */}
      <div className="px-4 -mt-5 relative z-10 mb-5">
        <div className="bg-white rounded-2xl shadow-lg flex items-center gap-3 px-4 py-3">
          <Icon name="Search" size={18} className="text-neutral-400" />
          <span className="text-neutral-400 text-sm">Куда хотите поехать?</span>
          <div className="ml-auto bg-blue-500 rounded-xl px-3 py-1">
            <span className="text-white text-xs font-medium">Найти</span>
          </div>
        </div>
      </div>

      {/* Услуги */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[17px] font-semibold text-neutral-900">Услуги</h2>
          <span className="text-blue-500 text-sm">Все</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {quickServices.map((s) => (
            <button key={s.label} className="flex flex-col items-center gap-1.5 cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${s.color}`}>
                <Icon name={s.icon} size={24} />
              </div>
              <span className="text-[11px] text-neutral-600 text-center leading-tight">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Популярные направления */}
      <div className="mb-6">
        <div className="flex justify-between items-center px-4 mb-3">
          <h2 className="text-[17px] font-semibold text-neutral-900">Направления</h2>
          <span className="text-blue-500 text-sm">Все</span>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto pb-1 scrollbar-none">
          {destinations.map((d) => (
            <div key={d.name} className="shrink-0 w-44 bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-100">
              <div className="h-24 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-5xl">
                {d.emoji}
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-[15px] text-neutral-900">{d.name}</p>
                    <p className="text-xs text-neutral-400">{d.country}</p>
                  </div>
                  <span className="text-[13px] font-medium text-blue-500">{d.temp}</span>
                </div>
                <span className="mt-2 inline-block bg-blue-50 text-blue-600 text-[11px] px-2 py-0.5 rounded-full">
                  {d.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Отзывы */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[17px] font-semibold text-neutral-900">Отзывы</h2>
          <span className="text-blue-500 text-sm">Все</span>
        </div>
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{r.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Icon key={i} name="Star" size={11} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
