export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/bf54193e-a6ea-4bcc-ab27-f15baf0df7fd/files/46bb7374-67e1-47f7-a88f-1bf930bd8826.jpg"
          alt="Travel destinations around the world"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Всё в одном месте</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Бронируй отели, нанимай местных гидов, покупай экскурсии и планируй маршруты — не переключаясь между десятками сервисов.
        </p>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Узнать больше
        </button>
      </div>
    </div>
  );
}