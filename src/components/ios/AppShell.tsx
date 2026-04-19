import Icon from "@/components/ui/icon";

type Tab = "home" | "explore" | "routes" | "map" | "profile";

interface AppShellProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: React.ReactNode;
}

const tabs = [
  { id: "home" as Tab, icon: "Home", label: "Главная" },
  { id: "explore" as Tab, icon: "Compass", label: "Услуги" },
  { id: "routes" as Tab, icon: "Map", label: "Маршруты" },
  { id: "map" as Tab, icon: "MapPin", label: "Карта" },
  { id: "profile" as Tab, icon: "User", label: "Профиль" },
];

export default function AppShell({ activeTab, onTabChange, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
      {/* Обёртка-телефон на десктопе */}
      <div className="relative w-full max-w-[390px] mx-auto bg-white overflow-hidden shadow-2xl"
        style={{ minHeight: "100svh", maxHeight: "100svh" }}>

        {/* Status bar iOS */}
        <div className="bg-white px-6 pt-3 pb-1 flex justify-between items-center shrink-0 sticky top-0 z-40">
          <span className="text-[13px] font-semibold">9:41</span>
          <div className="w-28 h-6 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2" />
          <div className="flex items-center gap-1.5">
            <Icon name="Signal" size={14} />
            <Icon name="Wifi" size={14} />
            <Icon name="Battery" size={14} />
          </div>
        </div>

        {/* Контент экрана */}
        <div className="overflow-y-auto" style={{ height: "calc(100svh - 44px - 83px)" }}>
          {children}
        </div>

        {/* Tab bar iOS */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-neutral-200 px-2 pt-2 pb-5 flex justify-around z-40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 cursor-pointer transition-colors ${
                activeTab === tab.id ? "text-blue-500" : "text-neutral-400"
              }`}
            >
              <Icon name={tab.icon} size={24} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
