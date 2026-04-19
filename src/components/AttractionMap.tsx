import { useState } from "react";
import Icon from "@/components/ui/icon";

const cities = [
  {
    id: "tbilisi",
    name: "Тбилиси",
    country: "Грузия",
    coords: { x: 62, y: 36 },
    attractions: [
      { name: "Старый Тбилиси", type: "История", rating: 4.9 },
      { name: "Крепость Нарикала", type: "Архитектура", rating: 4.8 },
      { name: "Мцхета", type: "Природа", rating: 4.7 },
    ],
  },
  {
    id: "istanbul",
    name: "Стамбул",
    country: "Турция",
    coords: { x: 55, y: 34 },
    attractions: [
      { name: "Айя-София", type: "История", rating: 4.9 },
      { name: "Гранд Базар", type: "Шопинг", rating: 4.7 },
      { name: "Босфор", type: "Природа", rating: 4.8 },
    ],
  },
  {
    id: "barcelona",
    name: "Барселона",
    country: "Испания",
    coords: { x: 42, y: 32 },
    attractions: [
      { name: "Саграда Фамилия", type: "Архитектура", rating: 5.0 },
      { name: "Парк Гуэль", type: "Искусство", rating: 4.8 },
      { name: "Ла Рамбла", type: "Прогулки", rating: 4.6 },
    ],
  },
  {
    id: "rome",
    name: "Рим",
    country: "Италия",
    coords: { x: 50, y: 33 },
    attractions: [
      { name: "Колизей", type: "История", rating: 4.9 },
      { name: "Ватикан", type: "История", rating: 4.9 },
      { name: "Фонтан Треви", type: "Архитектура", rating: 4.8 },
    ],
  },
  {
    id: "dubai",
    name: "Дубай",
    country: "ОАЭ",
    coords: { x: 66, y: 42 },
    attractions: [
      { name: "Бурдж Халифа", type: "Архитектура", rating: 4.9 },
      { name: "Дубай Молл", type: "Шопинг", rating: 4.7 },
      { name: "Пустыня Сафари", type: "Природа", rating: 4.8 },
    ],
  },
];

const typeColors: Record<string, string> = {
  "История": "bg-amber-100 text-amber-700",
  "Архитектура": "bg-blue-100 text-blue-700",
  "Природа": "bg-green-100 text-green-700",
  "Шопинг": "bg-purple-100 text-purple-700",
  "Искусство": "bg-pink-100 text-pink-700",
  "Прогулки": "bg-cyan-100 text-cyan-700",
};

export default function AttractionMap() {
  const [active, setActive] = useState(cities[0]);

  return (
    <section className="bg-neutral-900 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Карта</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 leading-tight">
          Достопримечательности
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Карта (SVG-схема) */}
          <div className="relative bg-neutral-800 rounded-sm overflow-hidden h-80 lg:h-auto min-h-64">
            <svg viewBox="0 0 100 70" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Упрощённые контуры материков */}
              <rect width="100" height="70" fill="#1f2937" />
              {/* Европа */}
              <ellipse cx="48" cy="30" rx="10" ry="8" fill="#374151" opacity="0.6" />
              {/* Азия */}
              <ellipse cx="70" cy="32" rx="18" ry="10" fill="#374151" opacity="0.6" />
              {/* Африка */}
              <ellipse cx="50" cy="48" rx="8" ry="10" fill="#374151" opacity="0.5" />
              {/* Метки городов */}
              {cities.map((city) => (
                <g key={city.id} onClick={() => setActive(city)} className="cursor-pointer">
                  <circle
                    cx={city.coords.x}
                    cy={city.coords.y}
                    r={active.id === city.id ? 2.5 : 1.8}
                    fill={active.id === city.id ? "#ffffff" : "#6b7280"}
                    className="transition-all duration-200"
                  />
                  {active.id === city.id && (
                    <circle cx={city.coords.x} cy={city.coords.y} r="4" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
                  )}
                  <text
                    x={city.coords.x + 3}
                    y={city.coords.y - 2}
                    fontSize="3"
                    fill={active.id === city.id ? "#ffffff" : "#9ca3af"}
                    className="select-none"
                  >
                    {city.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Информация о городе */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="MapPin" size={20} className="text-white" />
                <h3 className="text-2xl font-bold text-white">{active.name}</h3>
                <span className="text-neutral-400 text-sm">{active.country}</span>
              </div>
              <p className="text-neutral-400 text-sm">{active.attractions.length} топ-достопримечательности</p>
            </div>

            <div className="space-y-3 mb-8">
              {active.attractions.map((a) => (
                <div key={a.name} className="flex items-center justify-between bg-neutral-800 px-4 py-3 hover:bg-neutral-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="Landmark" size={16} className="text-neutral-400" />
                    <div>
                      <p className="text-white text-sm font-medium">{a.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-sm mt-1 inline-block ${typeColors[a.type] ?? "bg-neutral-700 text-neutral-300"}`}>
                        {a.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Icon name="Star" size={12} className="fill-yellow-400" />
                    <span className="text-sm text-white">{a.rating}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Переключатель городов */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setActive(city)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wide transition-colors cursor-pointer ${
                    active.id === city.id
                      ? "bg-white text-neutral-900"
                      : "border border-neutral-600 text-neutral-400 hover:border-neutral-400 hover:text-white"
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
