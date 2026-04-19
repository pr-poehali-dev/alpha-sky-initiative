import { useState } from "react";
import Icon from "@/components/ui/icon";

const destinations = ["Тбилиси", "Стамбул", "Барселона", "Рим", "Токио", "Бангкок", "Дубай", "Париж"];
const interests = ["Архитектура", "Природа", "Еда", "История", "Пляж", "Шопинг", "Активный отдых", "Искусство"];

const sampleRoute = [
  { day: 1, title: "Прибытие и старый город", desc: "Заселение в отель, прогулка по историческому центру, ужин в местном ресторане." },
  { day: 2, title: "Главные достопримечательности", desc: "Экскурсия с гидом по основным объектам, посещение музея, обед в кафе с видом." },
  { day: 3, title: "Природа и окрестности", desc: "Однодневная поездка в окрестности, живописные пейзажи, местные деревни." },
  { day: 4, title: "Свободный день", desc: "Рынки, шопинг, спа или дополнительная экскурсия по вашему выбору." },
  { day: 5, title: "Отъезд", desc: "Утренняя прогулка, прощальный завтрак, трансфер в аэропорт." },
];

export default function RouteGenerator() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  const toggleInterest = (i: string) => {
    setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  };

  return (
    <section className="bg-neutral-50 px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Планирование</p>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-12 leading-tight">
          Генератор маршрутов
        </h2>

        {!generated ? (
          <div className="bg-white border border-neutral-200 p-8 space-y-8">
            {/* Направление */}
            <div>
              <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-3">Направление</label>
              <div className="flex flex-wrap gap-2">
                {destinations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDestination(d)}
                    className={`px-4 py-2 text-sm border transition-colors cursor-pointer ${
                      destination === d ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Дни */}
            <div>
              <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-3">
                Количество дней: <span className="text-neutral-900 font-medium">{days}</span>
              </label>
              <input
                type="range" min={2} max={14} value={days}
                onChange={(e) => setDays(+e.target.value)}
                className="w-full accent-neutral-900"
              />
              <div className="flex justify-between text-xs text-neutral-400 mt-1">
                <span>2 дня</span><span>14 дней</span>
              </div>
            </div>

            {/* Интересы */}
            <div>
              <label className="block text-xs uppercase tracking-wide text-neutral-500 mb-3">Интересы</label>
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`px-4 py-2 text-sm border transition-colors cursor-pointer ${
                      selected.includes(i) ? "bg-neutral-900 text-white border-neutral-900" : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => destination && setGenerated(true)}
              disabled={!destination}
              className="w-full bg-neutral-900 text-white py-3 uppercase tracking-wide text-sm hover:bg-neutral-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Сгенерировать маршрут
            </button>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">{destination} · {days} дней</h3>
                {selected.length > 0 && <p className="text-sm text-neutral-500 mt-1">{selected.join(", ")}</p>}
              </div>
              <button onClick={() => setGenerated(false)} className="text-sm text-neutral-500 hover:text-neutral-900 cursor-pointer flex items-center gap-1">
                <Icon name="RefreshCw" size={14} /> Изменить
              </button>
            </div>
            <div className="space-y-6">
              {sampleRoute.slice(0, Math.min(days, 5)).map((r) => (
                <div key={r.day} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-neutral-900 text-white flex items-center justify-center text-sm font-bold">
                    {r.day}
                  </div>
                  <div className="pt-1">
                    <p className="font-medium text-neutral-900 text-sm">{r.title}</p>
                    <p className="text-sm text-neutral-500 mt-1">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 w-full border border-neutral-900 text-neutral-900 py-3 uppercase tracking-wide text-sm hover:bg-neutral-900 hover:text-white transition-colors cursor-pointer">
              Сохранить маршрут
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
