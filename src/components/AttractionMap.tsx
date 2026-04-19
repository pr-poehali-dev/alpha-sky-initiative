import { useState } from "react";
import Icon from "@/components/ui/icon";

const cities = [
  {
    id: "tbilisi",
    name: "Тбилиси",
    country: "Грузия",
    emoji: "🇬🇪",
    coords: { x: 58.5, y: 31.5 },
    color: "#f59e0b",
    attractions: [
      { name: "Старый Тбилиси", type: "История", rating: 4.9, icon: "Castle" },
      { name: "Крепость Нарикала", type: "Архитектура", rating: 4.8, icon: "Landmark" },
      { name: "Мцхета", type: "Природа", rating: 4.7, icon: "TreePine" },
    ],
  },
  {
    id: "istanbul",
    name: "Стамбул",
    country: "Турция",
    emoji: "🇹🇷",
    coords: { x: 54.2, y: 30.5 },
    color: "#ef4444",
    attractions: [
      { name: "Айя-София", type: "История", rating: 4.9, icon: "Building2" },
      { name: "Гранд Базар", type: "Шопинг", rating: 4.7, icon: "ShoppingBag" },
      { name: "Пролив Босфор", type: "Природа", rating: 4.8, icon: "Waves" },
    ],
  },
  {
    id: "barcelona",
    name: "Барселона",
    country: "Испания",
    emoji: "🇪🇸",
    coords: { x: 43.5, y: 29.5 },
    color: "#8b5cf6",
    attractions: [
      { name: "Саграда Фамилия", type: "Архитектура", rating: 5.0, icon: "Church" },
      { name: "Парк Гуэль", type: "Искусство", rating: 4.8, icon: "Palette" },
      { name: "Ла Рамбла", type: "Прогулки", rating: 4.6, icon: "Footprints" },
    ],
  },
  {
    id: "rome",
    name: "Рим",
    country: "Италия",
    emoji: "🇮🇹",
    coords: { x: 49.5, y: 30.8 },
    color: "#10b981",
    attractions: [
      { name: "Колизей", type: "История", rating: 4.9, icon: "Landmark" },
      { name: "Ватикан", type: "История", rating: 4.9, icon: "Crown" },
      { name: "Фонтан Треви", type: "Архитектура", rating: 4.8, icon: "Droplets" },
    ],
  },
  {
    id: "dubai",
    name: "Дубай",
    country: "ОАЭ",
    emoji: "🇦🇪",
    coords: { x: 63.5, y: 37.5 },
    color: "#06b6d4",
    attractions: [
      { name: "Бурдж Халифа", type: "Архитектура", rating: 4.9, icon: "Building" },
      { name: "Дубай Молл", type: "Шопинг", rating: 4.7, icon: "ShoppingCart" },
      { name: "Сафари в пустыне", type: "Природа", rating: 4.8, icon: "Sun" },
    ],
  },
];

const typeColors: Record<string, string> = {
  "История": "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  "Архитектура": "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  "Природа": "bg-green-500/20 text-green-300 border border-green-500/30",
  "Шопинг": "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  "Искусство": "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  "Прогулки": "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
};

// SVG путь мировой карты (упрощённый, но реалистичный)
const WORLD_PATH = `
M 8,28 Q 10,24 14,23 Q 17,22 18,25 Q 20,22 22,23 Q 24,21 26,22 Q 28,20 30,22
Q 32,19 35,20 Q 37,18 40,20 Q 41,18 43,19 Q 44,17 46,18 Q 48,16 50,18
Q 52,16 54,17 Q 56,15 58,16 Q 60,14 62,15 Q 64,14 66,15 Q 68,13 70,15
Q 72,13 74,14 Q 76,13 78,15 Q 80,14 82,16 Q 84,15 86,17 Q 88,16 90,18
Q 92,17 93,19 L 93,22 Q 91,23 89,22 Q 87,24 85,23 Q 83,25 81,24
Q 79,26 77,25 Q 75,27 73,26 Q 71,28 69,27 Q 67,29 65,28 Q 63,30 61,29
Q 59,31 57,30 Q 55,32 53,31 Q 51,33 49,32 Q 47,34 45,33 Q 43,35 41,33
Q 39,35 37,34 Q 35,36 33,35 Q 31,37 29,36 Q 27,38 25,37 Q 23,39 21,38
Q 19,40 17,38 Q 15,39 13,37 Q 11,38 9,36 Q 7,37 6,35 L 6,30 Z

M 15,40 Q 17,38 19,39 Q 21,37 23,39 Q 25,38 26,41 Q 28,39 30,41
Q 29,44 27,45 Q 25,47 23,46 Q 21,48 19,46 Q 17,47 15,45 Q 13,44 14,41 Z

M 35,38 Q 37,36 39,37 Q 41,36 43,38 Q 45,37 47,39 Q 49,37 51,38
Q 53,37 55,39 Q 57,37 59,38 Q 61,37 63,39 Q 65,37 67,38
Q 69,36 71,38 Q 73,37 75,39 Q 77,38 78,41
Q 79,43 77,45 Q 75,47 73,46 Q 71,48 69,46 Q 67,48 65,47
Q 63,49 61,48 Q 59,50 57,48 Q 55,49 53,47 Q 51,48 49,46
Q 47,48 45,47 Q 43,49 41,47 Q 39,48 37,46 Q 35,47 33,45
Q 31,43 33,40 Z

M 70,40 Q 72,38 74,39 Q 76,38 78,40 Q 80,38 82,40
Q 84,38 86,40 Q 88,38 90,41 Q 91,44 89,46
Q 87,48 85,47 Q 83,49 81,47 Q 79,49 77,47
Q 75,49 73,47 Q 71,48 69,46 Q 68,43 69,41 Z

M 20,50 Q 22,48 24,49 Q 26,48 27,51 Q 26,54 24,55
Q 22,57 20,55 Q 18,54 19,51 Z

M 75,50 Q 77,48 79,49 Q 81,48 83,50 Q 85,48 87,51
Q 86,54 84,55 Q 82,57 80,56 Q 78,57 76,55 Q 74,53 75,50 Z
`;

export default function AttractionMap() {
  const [active, setActive] = useState(cities[0]);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="bg-neutral-900 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Исследуй мир</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
          Карта достопримечательностей
        </h2>
        <p className="text-neutral-400 mb-12">Выбери город — узнай что посмотреть</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Карта */}
          <div className="lg:col-span-3 relative bg-[#0f172a] rounded-xl overflow-hidden border border-neutral-800" style={{ minHeight: 360 }}>
            {/* Сетка-подложка */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6b7280" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <svg
              viewBox="0 0 100 65"
              className="w-full h-full relative z-10"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Океан */}
              <rect width="100" height="65" fill="#0f172a" />

              {/* Европа */}
              <path d="M38,20 Q40,18 43,19 Q45,17 47,18 Q49,17 51,18 Q53,17 55,18 Q56,16 58,17 L58,24 Q56,26 54,25 Q52,26 50,25 Q48,27 46,26 Q44,28 42,27 Q40,28 38,27 Q36,27 35,25 Q34,23 36,21 Z" fill="#1e3a5f" />
              {/* Скандинавия */}
              <path d="M46,14 Q48,13 50,14 Q51,12 52,13 L52,17 Q50,16 48,17 Q46,16 46,14 Z" fill="#1e3a5f" />
              {/* Пиренейский п-в */}
              <path d="M38,24 Q40,23 42,24 Q44,23 45,25 Q44,27 42,27 Q40,28 38,27 Q36,26 37,24 Z" fill="#1e3a5f" />
              {/* Апеннины */}
              <path d="M49,25 Q50,24 51,25 L51,29 Q50,30 49,29 Z" fill="#1e3a5f" />
              {/* Греция */}
              <path d="M52,27 Q54,26 55,28 Q54,30 52,30 Q51,29 52,27 Z" fill="#1e3a5f" />

              {/* Азия / Ближний Восток */}
              <path d="M57,17 Q60,15 64,16 Q68,14 72,15 Q76,14 80,16 Q84,15 88,17 L90,22 Q88,23 85,22 Q82,24 79,23 Q76,25 73,24 Q70,26 67,25 Q64,27 61,26 Q59,27 57,25 Z" fill="#1e3a5f" />
              {/* Аравийский п-в */}
              <path d="M59,26 Q61,25 63,26 Q65,25 66,27 Q67,29 65,31 Q63,33 61,32 Q59,31 58,29 Q57,27 59,26 Z" fill="#1e3a5f" />
              {/* Индия */}
              <path d="M68,26 Q70,25 72,26 Q73,28 72,31 Q71,33 69,33 Q67,31 66,29 Q66,27 68,26 Z" fill="#1e3a5f" />
              {/* Юго-Вост Азия */}
              <path d="M78,27 Q80,26 82,27 Q84,26 86,28 Q85,31 83,31 Q81,32 79,30 Q77,29 78,27 Z" fill="#1e3a5f" />

              {/* Африка */}
              <path d="M42,29 Q44,28 46,29 Q48,28 50,30 Q52,29 53,31 Q54,33 53,36 Q52,39 50,40 Q48,42 46,41 Q44,42 42,40 Q40,38 39,35 Q38,32 39,30 Q40,28 42,29 Z" fill="#1e3a5f" />
              {/* Мадагаскар */}
              <path d="M54,36 Q55,35 56,37 Q55,40 54,40 Q53,39 53,37 Z" fill="#1e3a5f" />

              {/* Северная Америка */}
              <path d="M8,14 Q10,13 13,14 Q16,12 19,13 Q22,11 25,13 Q27,12 28,15 Q30,14 31,17 L30,22 Q28,23 26,22 Q24,24 22,23 Q20,25 18,23 Q16,24 14,22 Q12,23 10,21 Q8,22 7,20 Q6,18 7,16 Z" fill="#1e3a5f" />
              {/* Мексика/ЦА */}
              <path d="M18,23 Q20,22 22,23 Q23,25 22,27 Q21,29 19,29 Q17,28 16,26 Q16,24 18,23 Z" fill="#1e3a5f" />
              {/* Куба */}
              <path d="M22,25 Q24,24 25,26 Q24,27 22,26 Z" fill="#1e3a5f" />

              {/* Южная Америка */}
              <path d="M22,30 Q24,29 26,30 Q28,29 30,31 Q32,30 33,33 Q34,36 33,39 Q32,42 30,43 Q28,45 26,44 Q24,45 22,43 Q20,41 19,38 Q18,35 19,32 Q20,30 22,30 Z" fill="#1e3a5f" />

              {/* Австралия */}
              <path d="M79,40 Q82,38 85,39 Q88,38 90,41 Q91,44 89,46 Q87,48 84,47 Q81,48 79,46 Q77,44 78,41 Z" fill="#1e3a5f" />

              {/* Линии долгот/широт */}
              {[20, 40, 60, 80].map(x => (
                <line key={x} x1={x} y1="10" x2={x} y2="55" stroke="#334155" strokeWidth="0.3" strokeDasharray="1,2" />
              ))}
              {[20, 30, 40, 50].map(y => (
                <line key={y} x1="5" y1={y} x2="95" y2={y} stroke="#334155" strokeWidth="0.3" strokeDasharray="1,2" />
              ))}

              {/* Соединительные линии к активному городу */}
              {cities.filter(c => c.id !== active.id).map(city => (
                <line
                  key={city.id}
                  x1={active.coords.x} y1={active.coords.y}
                  x2={city.coords.x} y2={city.coords.y}
                  stroke="#334155" strokeWidth="0.3" strokeDasharray="0.5,1.5"
                  opacity="0.5"
                />
              ))}

              {/* Метки городов */}
              {cities.map((city) => {
                const isActive = active.id === city.id;
                const isHovered = hovered === city.id;
                return (
                  <g
                    key={city.id}
                    onClick={() => setActive(city)}
                    onMouseEnter={() => setHovered(city.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Пульсирующий круг для активного */}
                    {isActive && (
                      <>
                        <circle cx={city.coords.x} cy={city.coords.y} r="5" fill={city.color} opacity="0.15" />
                        <circle cx={city.coords.x} cy={city.coords.y} r="3.5" fill={city.color} opacity="0.25" />
                      </>
                    )}
                    {/* Основная точка */}
                    <circle
                      cx={city.coords.x}
                      cy={city.coords.y}
                      r={isActive ? 2.2 : isHovered ? 1.8 : 1.4}
                      fill={isActive || isHovered ? city.color : "#6b7280"}
                    />
                    {/* Метка */}
                    <rect
                      x={city.coords.x + 2.5}
                      y={city.coords.y - 3.5}
                      width={city.name.length * 1.7}
                      height="4"
                      rx="0.5"
                      fill={isActive ? city.color : "#1e293b"}
                      opacity={isActive || isHovered ? 1 : 0.8}
                    />
                    <text
                      x={city.coords.x + 3.5}
                      y={city.coords.y - 0.8}
                      fontSize="2.3"
                      fill={isActive ? "#000" : "#94a3b8"}
                      fontWeight={isActive ? "bold" : "normal"}
                      style={{ userSelect: "none" }}
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Легенда */}
            <div className="absolute bottom-3 left-3 flex gap-3">
              {cities.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActive(c)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ background: active.id === c.id ? c.color : "#4b5563" }}
                  />
                  <span className="text-[9px] uppercase tracking-wide" style={{ color: active.id === c.id ? c.color : "#6b7280" }}>
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Панель информации */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Заголовок города */}
            <div
              className="rounded-xl p-5 border"
              style={{
                background: `${active.color}10`,
                borderColor: `${active.color}30`,
              }}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl">{active.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{active.name}</h3>
                  <p className="text-neutral-400 text-sm">{active.country}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs text-neutral-500 uppercase tracking-wide">объектов</p>
                  <p className="text-2xl font-bold" style={{ color: active.color }}>{active.attractions.length}</p>
                </div>
              </div>
            </div>

            {/* Достопримечательности */}
            <div className="space-y-2 flex-1">
              {active.attractions.map((a, i) => (
                <div
                  key={a.name}
                  className="bg-neutral-800/60 border border-neutral-700 rounded-xl p-4 hover:border-neutral-500 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${active.color}20` }}
                    >
                      <Icon name={a.icon} size={16} style={{ color: active.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-white text-sm font-medium truncate">{a.name}</p>
                        <div className="flex items-center gap-1 shrink-0">
                          <Icon name="Star" size={11} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-yellow-400 text-xs font-medium">{a.rating}</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full mt-1.5 inline-block ${typeColors[a.type] ?? "bg-neutral-700 text-neutral-300"}`}>
                        {a.type}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 ml-11 text-xs text-neutral-500 flex items-center gap-1">
                    <span>#{i + 1} в рейтинге</span>
                    <span>·</span>
                    <span style={{ color: active.color }}>Добавить в маршрут →</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Кнопка */}
            <button
              className="w-full py-3 rounded-xl text-sm uppercase tracking-wide font-medium transition-all duration-200 cursor-pointer"
              style={{ background: active.color, color: "#000" }}
            >
              Все достопримечательности {active.name}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
