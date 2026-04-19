import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const bookings = [
  { id: 1, title: "Отель Grand Tbilisi", date: "12–15 мая 2025", status: "Подтверждено" },
  { id: 2, title: "Гид Алибек — Алматы", date: "20 мая 2025", status: "Ожидает" },
  { id: 3, title: "Тур «Горный Кавказ»", date: "1–7 июня 2025", status: "Подтверждено" },
];

export default function ProfileModal({ open, onClose }: ProfileModalProps) {
  const [tab, setTab] = useState<"profile" | "bookings">("profile");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-sm shadow-2xl overflow-hidden">
        {/* Шапка */}
        <div className="bg-neutral-900 px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-600 flex items-center justify-center">
              <Icon name="User" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Александр Петров</p>
              <p className="text-neutral-400 text-xs">alex@email.com</p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white cursor-pointer">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Вкладки */}
        <div className="flex border-b border-neutral-200">
          {(["profile", "bookings"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-sm uppercase tracking-wide transition-colors cursor-pointer ${
                tab === t ? "border-b-2 border-neutral-900 text-neutral-900 font-medium" : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              {t === "profile" ? "Профиль" : "Мои брони"}
            </button>
          ))}
        </div>

        {/* Контент */}
        <div className="p-6">
          {tab === "profile" && (
            <div className="space-y-4">
              {[
                { label: "Имя", value: "Александр Петров", icon: "User" },
                { label: "Телефон", value: "+7 900 123-45-67", icon: "Phone" },
                { label: "Страна", value: "Россия", icon: "Globe" },
                { label: "Путешествий", value: "12 поездок", icon: "Plane" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-2 border-b border-neutral-100">
                  <Icon name={item.icon} size={16} className="text-neutral-400" />
                  <div>
                    <p className="text-xs text-neutral-400">{item.label}</p>
                    <p className="text-sm text-neutral-900">{item.value}</p>
                  </div>
                </div>
              ))}
              <button className="w-full mt-2 bg-neutral-900 text-white py-2 text-sm uppercase tracking-wide hover:bg-neutral-700 transition-colors cursor-pointer">
                Редактировать
              </button>
            </div>
          )}

          {tab === "bookings" && (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="border border-neutral-200 p-4 hover:border-neutral-400 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{b.title}</p>
                      <p className="text-xs text-neutral-400 mt-1">{b.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 ${b.status === "Подтверждено" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
