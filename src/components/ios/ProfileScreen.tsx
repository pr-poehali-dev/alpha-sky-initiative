import { useState } from "react";
import Icon from "@/components/ui/icon";

const bookings = [
  { id: 1, title: "Grand Tbilisi Hotel", date: "12–15 мая 2025", status: "Подтверждено", emoji: "🏨", color: "text-green-600 bg-green-50" },
  { id: 2, title: "Гид Алибек — Алматы", date: "20 мая 2025", status: "Ожидает", emoji: "🧑‍🦱", color: "text-yellow-600 bg-yellow-50" },
  { id: 3, title: "Тур «Горный Кавказ»", date: "1–7 июня 2025", status: "Подтверждено", emoji: "🏔️", color: "text-green-600 bg-green-50" },
];

const menuItems = [
  { icon: "Heart", label: "Избранное", color: "bg-red-100 text-red-500" },
  { icon: "CreditCard", label: "Оплата", color: "bg-blue-100 text-blue-500" },
  { icon: "Bell", label: "Уведомления", color: "bg-yellow-100 text-yellow-500" },
  { icon: "Globe", label: "Язык", color: "bg-green-100 text-green-500" },
  { icon: "HelpCircle", label: "Поддержка", color: "bg-purple-100 text-purple-500" },
  { icon: "Settings", label: "Настройки", color: "bg-neutral-100 text-neutral-500" },
];

export default function ProfileScreen() {
  const [tab, setTab] = useState<"main" | "bookings">("main");

  return (
    <div className="pb-4">
      {/* Аватар и имя */}
      <div className="bg-gradient-to-b from-blue-500 to-blue-600 px-4 pt-4 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">Александр Петров</h1>
            <p className="text-blue-200 text-sm">alex@email.com</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Star" size={12} className="fill-yellow-300 text-yellow-300" />
              <span className="text-white text-xs font-medium">Премиум путешественник</span>
            </div>
          </div>
        </div>
        {/* Стата */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { val: "12", label: "Поездок" },
            { val: "5", label: "Стран" },
            { val: "4.9", label: "Рейтинг" },
          ].map(s => (
            <div key={s.label} className="bg-white/15 rounded-2xl py-2.5 text-center">
              <p className="text-white font-bold text-lg">{s.val}</p>
              <p className="text-blue-200 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Вкладки */}
      <div className="flex mx-4 mt-4 bg-neutral-100 rounded-2xl p-1">
        {(["main", "bookings"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
              tab === t ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-400"
            }`}
          >
            {t === "main" ? "Профиль" : "Мои брони"}
          </button>
        ))}
      </div>

      {tab === "main" ? (
        <div className="px-4 mt-4 space-y-2">
          {menuItems.map((item) => (
            <button key={item.label} className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm cursor-pointer">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                <Icon name={item.icon} size={18} />
              </div>
              <span className="text-[15px] font-medium text-neutral-900 flex-1 text-left">{item.label}</span>
              <Icon name="ChevronRight" size={16} className="text-neutral-300" />
            </button>
          ))}
          <button className="w-full bg-red-50 rounded-2xl p-4 flex items-center gap-3 mt-2 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
              <Icon name="LogOut" size={18} className="text-red-500" />
            </div>
            <span className="text-[15px] font-medium text-red-500 flex-1 text-left">Выйти</span>
          </button>
        </div>
      ) : (
        <div className="px-4 mt-4 space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100">
              <div className="flex items-start gap-3">
                <span className="text-3xl">{b.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-[15px] text-neutral-900">{b.title}</p>
                  <p className="text-xs text-neutral-400 mt-0.5">{b.date}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${b.color}`}>
                  {b.status}
                </span>
              </div>
              <button className="mt-3 w-full border border-neutral-200 rounded-xl py-2 text-sm text-neutral-600 cursor-pointer">
                Подробнее
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
