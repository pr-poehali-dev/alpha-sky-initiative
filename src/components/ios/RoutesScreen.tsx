import { useState } from "react";
import Icon from "@/components/ui/icon";

const destinations = ["Тбилиси", "Стамбул", "Барселона", "Рим", "Токио", "Бангкок", "Дубай", "Париж"];
const interests = ["Архитектура", "Природа", "Еда", "История", "Пляж", "Шопинг", "Спорт", "Искусство"];

const sampleRoute = [
  { day: 1, title: "Прибытие", desc: "Заселение в отель, прогулка по центру, ужин.", icon: "Plane" },
  { day: 2, title: "Главные места", desc: "Экскурсия с гидом, музей, кафе с видом.", icon: "Camera" },
  { day: 3, title: "Природа", desc: "Поездка в окрестности, пейзажи, деревни.", icon: "TreePine" },
  { day: 4, title: "Свободный день", desc: "Рынки, шопинг, спа или доп. экскурсия.", icon: "Coffee" },
  { day: 5, title: "Отъезд", desc: "Прогулка, завтрак, трансфер в аэропорт.", icon: "LogOut" },
];

export default function RoutesScreen() {
  const [step, setStep] = useState<"form" | "result">("form");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (i: string) =>
    setSelected((prev) => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="pb-4">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-neutral-900">Маршруты</h1>
        <p className="text-sm text-neutral-400 mt-1">Сгенерируй идеальный план поездки</p>
      </div>

      {step === "form" ? (
        <div className="px-4 space-y-5 mt-2">
          {/* Направление */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-neutral-400 font-medium mb-3">Направление</p>
            <div className="flex flex-wrap gap-2">
              {destinations.map((d) => (
                <button
                  key={d}
                  onClick={() => setDestination(d)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                    destination === d ? "bg-blue-500 text-white" : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Дни */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs uppercase tracking-wide text-neutral-400 font-medium">Дней</p>
              <span className="text-2xl font-bold text-blue-500">{days}</span>
            </div>
            <input
              type="range" min={2} max={14} value={days}
              onChange={(e) => setDays(+e.target.value)}
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-xs text-neutral-300 mt-1">
              <span>2</span><span>14</span>
            </div>
          </div>

          {/* Интересы */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-neutral-400 font-medium mb-3">Интересы</p>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors ${
                    selected.includes(i) ? "bg-blue-500 text-white" : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => destination && setStep("result")}
            disabled={!destination}
            className="w-full bg-blue-500 text-white py-4 rounded-2xl font-semibold text-[15px] disabled:opacity-40 cursor-pointer transition-opacity"
          >
            Сгенерировать маршрут ✨
          </button>
        </div>
      ) : (
        <div className="px-4 mt-2 space-y-3">
          {/* Заголовок результата */}
          <div className="bg-blue-500 rounded-2xl p-4 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-xs uppercase tracking-wide">Маршрут</p>
                <h2 className="text-xl font-bold mt-1">{destination}</h2>
                <p className="text-blue-200 text-sm">{days} дней · {selected.join(", ") || "Общий"}</p>
              </div>
              <button onClick={() => setStep("form")} className="bg-white/20 rounded-xl p-2 cursor-pointer">
                <Icon name="RefreshCw" size={16} />
              </button>
            </div>
          </div>

          {sampleRoute.slice(0, Math.min(days, 5)).map((r) => (
            <div key={r.day} className="bg-white rounded-2xl p-4 shadow-sm flex gap-3 items-start">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon name={r.icon} size={18} className="text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-medium">День {r.day}</p>
                <p className="font-semibold text-neutral-900 text-[15px]">{r.title}</p>
                <p className="text-sm text-neutral-400 mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}

          <button className="w-full bg-neutral-900 text-white py-4 rounded-2xl font-semibold text-[15px] cursor-pointer">
            Сохранить маршрут
          </button>
        </div>
      )}
    </div>
  );
}
