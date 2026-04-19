import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = [
  { id: "all", label: "Все" },
  { id: "hotels", label: "Отели" },
  { id: "guides", label: "Гиды" },
  { id: "tours", label: "Туры" },
  { id: "transfer", label: "Трансфер" },
];

const items = [
  {
    id: 1, category: "hotels",
    title: "Grand Tbilisi Hotel", subtitle: "Тбилиси · 5★",
    price: "от 4 200 ₽/ночь", rating: 4.9, reviews: 312,
    emoji: "🏨", tag: "Бестселлер",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 2, category: "guides",
    title: "Давид Бакрадзе", subtitle: "Гид · Тбилиси",
    price: "3 500 ₽ / день", rating: 5.0, reviews: 89,
    emoji: "🧑‍🦱", tag: "Проверен",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    id: 3, category: "tours",
    title: "Горный Кавказ", subtitle: "7 дней · Грузия",
    price: "от 42 000 ₽", rating: 4.8, reviews: 156,
    emoji: "🏔️", tag: "Топ",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 4, category: "transfer",
    title: "Трансфер из аэропорта", subtitle: "Тбилиси · до 4 чел.",
    price: "1 200 ₽", rating: 4.7, reviews: 441,
    emoji: "🚗", tag: "Быстро",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 5, category: "hotels",
    title: "Istanbul Palace", subtitle: "Стамбул · 4★",
    price: "от 5 800 ₽/ночь", rating: 4.8, reviews: 274,
    emoji: "🏩", tag: "Новинка",
    tagColor: "bg-pink-100 text-pink-700",
  },
  {
    id: 6, category: "tours",
    title: "Барселона за 3 дня", subtitle: "3 дня · Испания",
    price: "от 18 000 ₽", rating: 4.9, reviews: 203,
    emoji: "🌆", tag: "Популярно",
    tagColor: "bg-cyan-100 text-cyan-700",
  },
];

export default function ExploreScreen() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = activeCategory === "all" ? items : items.filter(i => i.category === activeCategory);

  return (
    <div className="pb-4">
      {/* Шапка */}
      <div className="px-4 pt-4 pb-3 bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-neutral-900 mb-3">Услуги</h1>
        {/* Поиск */}
        <div className="bg-neutral-100 rounded-2xl flex items-center gap-2 px-4 py-2.5 mb-3">
          <Icon name="Search" size={16} className="text-neutral-400" />
          <span className="text-neutral-400 text-sm">Поиск по услугам...</span>
        </div>
        {/* Фильтры */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                activeCategory === c.id
                  ? "bg-blue-500 text-white"
                  : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Карточки */}
      <div className="px-4 pt-2 space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
            <div className="flex items-stretch">
              <div className="w-20 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-4xl shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 p-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="font-semibold text-[15px] text-neutral-900 leading-tight">{item.title}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{item.subtitle}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-neutral-700">{item.rating}</span>
                    <span className="text-xs text-neutral-400">({item.reviews})</span>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">{item.price}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-neutral-100 px-3 py-2 flex gap-2">
              <button className="flex-1 bg-blue-500 text-white text-sm py-1.5 rounded-xl font-medium cursor-pointer">
                Забронировать
              </button>
              <button className="w-9 h-9 flex items-center justify-center border border-neutral-200 rounded-xl cursor-pointer">
                <Icon name="Heart" size={16} className="text-neutral-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
