import { useState } from "react";
import Icon from "@/components/ui/icon";

const services = [
  { icon: "BedDouble", label: "Бронирование отелей" },
  { icon: "UserCheck", label: "Наём гидов" },
  { icon: "Map", label: "Экскурсии и туры" },
  { icon: "Car", label: "Трансфер" },
  { icon: "Plane", label: "Авиабилеты" },
  { icon: "Utensils", label: "Рестораны" },
  { icon: "Shield", label: "Страховка" },
  { icon: "Backpack", label: "Аренда снаряжения" },
];

interface HeaderProps {
  className?: string;
  onOpenProfile?: () => void;
  onOpenChat?: () => void;
}

export default function Header({ className, onOpenProfile, onOpenChat }: HeaderProps) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-base font-bold tracking-widest">ROAMIX</div>
        <nav className="flex gap-8 items-center">
          {/* Услуги с выпадающим меню */}
          <div className="relative">
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm flex items-center gap-1 cursor-pointer"
            >
              Услуги
              <Icon name={servicesOpen ? "ChevronUp" : "ChevronDown"} size={14} />
            </button>

            {servicesOpen && (
              <div className="absolute top-full right-0 mt-3 w-64 bg-white shadow-2xl rounded-sm overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-neutral-100">
                  <p className="text-xs uppercase tracking-wide text-neutral-400">Все услуги</p>
                </div>
                {services.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setServicesOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50 transition-colors duration-150 cursor-pointer text-left"
                  >
                    <Icon name={s.icon} size={16} className="text-neutral-500 shrink-0" />
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenChat}
            className="text-white hover:text-neutral-300 transition-colors duration-300 uppercase text-sm cursor-pointer"
          >
            Ассистент
          </button>

          <button
            onClick={onOpenProfile}
            className="text-white hover:text-neutral-300 transition-colors duration-300 cursor-pointer"
          >
            <Icon name="User" size={18} />
          </button>
        </nav>
      </div>

      {/* Overlay для закрытия меню */}
      {servicesOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setServicesOpen(false)}
        />
      )}
    </header>
  );
}