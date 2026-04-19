import { useState } from "react";
import Icon from "@/components/ui/icon";

const cities = [
  {
    id: "tbilisi", name: "Тбилиси", country: "Грузия", emoji: "🇬🇪",
    coords: { x: 58.5, y: 31.5 }, color: "#f59e0b",
    attractions: [
      { name: "Старый Тбилиси", type: "История", rating: 4.9, icon: "Castle" },
      { name: "Крепость Нарикала", type: "Архитектура", rating: 4.8, icon: "Landmark" },
      { name: "Мцхета", type: "Природа", rating: 4.7, icon: "TreePine" },
    ],
  },
  {
    id: "istanbul", name: "Стамбул", country: "Турция", emoji: "🇹🇷",
    coords: { x: 54.2, y: 30.5 }, color: "#ef4444",
    attractions: [
      { name: "Айя-София", type: "История", rating: 4.9, icon: "Building2" },
      { name: "Гранд Базар", type: "Шопинг", rating: 4.7, icon: "ShoppingBag" },
      { name: "Пролив Босфор", type: "Природа", rating: 4.8, icon: "Waves" },
    ],
  },
  {
    id: "barcelona", name: "Барселона", country: "Испания", emoji: "🇪🇸",
    coords: { x: 43.5, y: 29.5 }, color: "#8b5cf6",
    attractions: [
      { name: "Саграда Фамилия", type: "Архитектура", rating: 5.0, icon: "Church" },
      { name: "Парк Гуэль", type: "Искусство", rating: 4.8, icon: "Palette" },
      { name: "Ла Рамбла", type: "Прогулки", rating: 4.6, icon: "Footprints" },
    ],
  },
  {
    id: "rome", name: "Рим", country: "Италия", emoji: "🇮🇹",
    coords: { x: 49.5, y: 30.8 }, color: "#10b981",
    attractions: [
      { name: "Колизей", type: "История", rating: 4.9, icon: "Landmark" },
      { name: "Ватикан", type: "История", rating: 4.9, icon: "Crown" },
      { name: "Фонтан Треви", type: "Архитектура", rating: 4.8, icon: "Droplets" },
    ],
  },
  {
    id: "dubai", name: "Дубай", country: "ОАЭ", emoji: "🇦🇪",
    coords: { x: 63.5, y: 37.5 }, color: "#06b6d4",
    attractions: [
      { name: "Бурдж Халифа", type: "Архитектура", rating: 4.9, icon: "Building" },
      { name: "Дубай Молл", type: "Шопинг", rating: 4.7, icon: "ShoppingCart" },
      { name: "Сафари", type: "Природа", rating: 4.8, icon: "Sun" },
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

export default function MapScreen() {
  const [active, setActive] = useState(cities[0]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-neutral-900">Карта</h1>
        <p className="text-sm text-neutral-400 mt-0.5">Достопримечательности мира</p>
      </div>

      {/* SVG карта */}
      <div className="mx-4 rounded-2xl overflow-hidden bg-[#0f172a] shadow-sm border border-neutral-200 relative" style={{ height: 220 }}>
        <svg viewBox="0 0 100 65" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          <rect width="100" height="65" fill="#0f172a" />
          {/* Сетка */}
          {[20, 40, 60, 80].map(x => (
            <line key={x} x1={x} y1="10" x2={x} y2="55" stroke="#1e293b" strokeWidth="0.4" />
          ))}
          {[20, 30, 40, 50].map(y => (
            <line key={y} x1="5" y1={y} x2="95" y2={y} stroke="#1e293b" strokeWidth="0.4" />
          ))}
          {/* Материки */}
          <path d="M38,20 Q43,17 51,18 Q56,16 58,17 L58,24 Q54,25 50,25 Q46,26 42,27 Q38,27 36,25 Q34,23 36,21 Z" fill="#1e3a5f" />
          <path d="M38,24 Q42,23 45,25 Q44,27 38,27 Q36,26 37,24 Z" fill="#1e3a5f" />
          <path d="M49,25 L51,25 L51,29 Q50,30 49,29 Z" fill="#1e3a5f" />
          <path d="M57,17 Q64,16 72,15 Q80,16 88,17 L90,22 Q82,24 73,24 Q64,27 57,25 Z" fill="#1e3a5f" />
          <path d="M59,26 Q65,25 66,27 Q67,29 61,32 Q58,29 59,26 Z" fill="#1e3a5f" />
          <path d="M68,26 Q73,26 72,31 Q71,33 69,33 Q66,29 68,26 Z" fill="#1e3a5f" />
          <path d="M42,29 Q50,28 53,31 Q54,36 50,40 Q46,41 42,40 Q38,35 39,30 Z" fill="#1e3a5f" />
          <path d="M8,14 Q19,13 28,15 L30,22 Q22,23 14,22 Q8,22 7,20 Z" fill="#1e3a5f" />
          <path d="M22,30 Q30,29 33,33 Q34,39 26,44 Q19,41 19,38 Q18,32 22,30 Z" fill="#1e3a5f" />
          <path d="M79,40 Q88,38 90,41 Q91,46 84,47 Q77,48 78,41 Z" fill="#1e3a5f" />

          {/* Линии от активного */}
          {cities.filter(c => c.id !== active.id).map(city => (
            <line key={city.id}
              x1={active.coords.x} y1={active.coords.y}
              x2={city.coords.x} y2={city.coords.y}
              stroke="#334155" strokeWidth="0.3" strokeDasharray="0.8,1.5" opacity="0.6"
            />
          ))}

          {/* Метки */}
          {cities.map((city) => {
            const isActive = active.id === city.id;
            return (
              <g key={city.id} onClick={() => setActive(city)} style={{ cursor: "pointer" }}>
                {isActive && (
                  <>
                    <circle cx={city.coords.x} cy={city.coords.y} r="5" fill={city.color} opacity="0.15" />
                    <circle cx={city.coords.x} cy={city.coords.y} r="3.2" fill={city.color} opacity="0.3" />
                  </>
                )}
                <circle cx={city.coords.x} cy={city.coords.y} r={isActive ? 2 : 1.4} fill={isActive ? city.color : "#6b7280"} />
                <rect x={city.coords.x + 2.5} y={city.coords.y - 3.5} width={city.name.length * 1.7} height="4" rx="0.5"
                  fill={isActive ? city.color : "#1e293b"} opacity={isActive ? 1 : 0.85} />
                <text x={city.coords.x + 3.5} y={city.coords.y - 0.8} fontSize="2.3"
                  fill={isActive ? "#000" : "#94a3b8"} fontWeight={isActive ? "bold" : "normal"} style={{ userSelect: "none" }}>
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Чипы городов */}
      <div className="flex gap-2 px-4 mt-3 overflow-x-auto scrollbar-none pb-1">
        {cities.map(city => (
          <button
            key={city.id}
            onClick={() => setActive(city)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              active.id === city.id ? "text-white" : "bg-neutral-100 text-neutral-600"
            }`}
            style={active.id === city.id ? { background: city.color, color: "#fff" } : {}}
          >
            <span>{city.emoji}</span>
            <span>{city.name}</span>
          </button>
        ))}
      </div>

      {/* Достопримечательности */}
      <div className="px-4 mt-4 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{active.emoji}</span>
          <div>
            <h2 className="font-bold text-neutral-900">{active.name}</h2>
            <p className="text-xs text-neutral-400">{active.country}</p>
          </div>
        </div>
        <div className="space-y-2">
          {active.attractions.map((a) => (
            <div key={a.name} className="bg-white rounded-2xl p-3 shadow-sm border border-neutral-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${active.color}20` }}>
                <Icon name={a.icon} size={18} style={{ color: active.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[14px] text-neutral-900 truncate">{a.name}</p>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${typeColors[a.type] ?? "bg-neutral-100 text-neutral-500"}`}>
                  {a.type}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-neutral-700">{a.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
