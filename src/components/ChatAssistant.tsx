import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

const suggestions = [
  "Лучшие отели в Тбилиси",
  "Экскурсии в Стамбуле",
  "Нужен гид в Барселоне",
  "Маршрут на 7 дней по Италии",
];

const botReplies: Record<string, string> = {
  default: "Отличный вопрос! Я помогу подобрать лучшие варианты. Уточните: на сколько человек и какие даты планируете?",
};

interface ChatAssistantProps {
  open: boolean;
  onClose: () => void;
}

export default function ChatAssistant({ open, onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: "Привет! Я ваш персональный туристический ассистент. Помогу найти отель, гида или составить маршрут. Чем могу помочь?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    const botMsg: Message = {
      id: Date.now() + 1,
      role: "bot",
      text: botReplies.default,
    };
    setMessages((prev) => [...prev, userMsg]);
    setTimeout(() => setMessages((prev) => [...prev, botMsg]), 600);
    setInput("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-md h-[90vh] sm:h-[600px] rounded-t-2xl sm:rounded-sm shadow-2xl flex flex-col overflow-hidden">
        {/* Шапка */}
        <div className="bg-neutral-900 px-5 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Icon name="Bot" size={16} className="text-neutral-900" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">WanderBot</p>
              <p className="text-neutral-400 text-xs">Туристический ассистент</p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white cursor-pointer">
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Сообщения */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed rounded-sm ${
                  msg.role === "user"
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Подсказки */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto shrink-0">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="whitespace-nowrap text-xs border border-neutral-300 text-neutral-600 px-3 py-1.5 hover:border-neutral-900 hover:text-neutral-900 transition-colors cursor-pointer shrink-0"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Ввод */}
        <div className="px-4 py-3 border-t border-neutral-200 flex gap-2 shrink-0">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Спросите что угодно..."
            className="flex-1 border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-neutral-900 transition-colors"
          />
          <button
            onClick={() => send(input)}
            className="bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
