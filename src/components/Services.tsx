import Icon from "@/components/ui/icon";

const services = [
  {
    icon: "BedDouble",
    title: "Бронирование отелей",
    description: "Тысячи отелей по всему миру с мгновенным подтверждением и лучшими ценами.",
  },
  {
    icon: "UserCheck",
    title: "Наём гидов",
    description: "Местные проверенные гиды на любой язык и любой маршрут.",
  },
  {
    icon: "Map",
    title: "Экскурсии и туры",
    description: "Готовые туры и индивидуальные экскурсии по популярным направлениям.",
  },
  {
    icon: "Car",
    title: "Трансфер",
    description: "Комфортный трансфер из аэропорта и между городами.",
  },
  {
    icon: "Plane",
    title: "Авиабилеты",
    description: "Поиск и бронирование рейсов по лучшим ценам без скрытых комиссий.",
  },
  {
    icon: "Utensils",
    title: "Рестораны",
    description: "Бронь столиков в лучших ресторанах с отзывами путешественников.",
  },
  {
    icon: "Shield",
    title: "Страховка",
    description: "Туристическая страховка за пару кликов прямо в приложении.",
  },
  {
    icon: "Backpack",
    title: "Аренда снаряжения",
    description: "Прокат туристического и спортивного снаряжения на месте.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Всё для поездки</p>
        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-16 leading-tight max-w-xl">
          Услуги Roamix
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group border border-neutral-200 p-6 hover:border-neutral-900 transition-all duration-300 cursor-pointer"
            >
              <div className="mb-4">
                <Icon name={service.icon} size={32} className="text-neutral-900" />
              </div>
              <h3 className="text-base font-semibold text-neutral-900 mb-2 uppercase tracking-wide">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}