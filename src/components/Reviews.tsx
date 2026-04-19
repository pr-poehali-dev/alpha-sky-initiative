import Icon from "@/components/ui/icon";

const reviews = [
  {
    id: 1,
    name: "Мария К.",
    country: "Москва",
    rating: 5,
    text: "Нашла гида через WanderAll — Давид показал такой Тбилиси, о котором не пишут в путеводителях. Бронь отеля за минуту. Всё идеально!",
    service: "Гид + Отель",
    avatar: "M",
  },
  {
    id: 2,
    name: "Алексей П.",
    country: "Санкт-Петербург",
    rating: 5,
    text: "Генератор маршрутов составил идеальный план на 10 дней по Италии. Экскурсии, рестораны, трансфер — всё в одном месте. Рекомендую!",
    service: "Маршрут + Туры",
    avatar: "А",
  },
  {
    id: 3,
    name: "Елена В.",
    country: "Казань",
    rating: 5,
    text: "Страховка оформилась за 2 минуты прямо перед вылетом. Трансфер из аэропорта приехал точно в срок. Сервис на высшем уровне.",
    service: "Страховка + Трансфер",
    avatar: "Е",
  },
  {
    id: 4,
    name: "Дмитрий С.",
    country: "Новосибирск",
    rating: 4,
    text: "Использовал чат-ассистент для планирования поездки в Таиланд. Ответил на все вопросы за секунды, предложил нестандартные маршруты.",
    service: "Ассистент",
    avatar: "Д",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="Star"
          size={14}
          className={i < count ? "text-yellow-400 fill-yellow-400" : "text-neutral-200 fill-neutral-200"}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Отзывы</p>
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-4">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight max-w-sm">
            Нам доверяют путешественники
          </h2>
          <div className="flex items-center gap-3">
            <div className="text-5xl font-bold text-neutral-900">4.9</div>
            <div>
              <Stars count={5} />
              <p className="text-xs text-neutral-500 mt-1">На основе 2 400+ отзывов</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <div key={r.id} className="border border-neutral-200 p-6 flex flex-col gap-4 hover:border-neutral-400 transition-colors">
              <Stars count={r.rating} />
              <p className="text-sm text-neutral-700 leading-relaxed flex-1">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-100">
                <div className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{r.name}</p>
                  <p className="text-xs text-neutral-400">{r.country} · {r.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
