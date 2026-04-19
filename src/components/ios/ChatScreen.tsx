import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

const suggestions = [
  "Лучшие отели в Тбилиси 🏨",
  "Гид в Барселоне 🇪🇸",
  "Маршрут на 7 дней 🗺️",
  "Что посмотреть в Дубае ✨",
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "bot", text: "Привет! Я WanderBot — ваш персональный ассистент. Помогу найти отель, гида или составить маршрут 🌍" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "bot",
        text: "Отличный вопрос! Подберу лучшие варианты для вас. На сколько человек и какие даты планируете? 😊",
      }]);
    }, 700);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Шапка */}
      <div className="px-4 pt-4 pb-3 border-b border-neutral-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <Icon name="Bot" size={20} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-[17px] text-neutral-900">WanderBot</h1>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-neutral-400">Онлайн</span>
          </div>
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
            {msg.role === "bot" && (
              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mb-1">
                <Icon name="Bot" size={14} className="text-blue-500" />
              </div>
            )}
            <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-blue-500 text-white rounded-br-sm"
                : "bg-neutral-100 text-neutral-800 rounded-bl-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Подсказки */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="shrink-0 bg-blue-50 text-blue-600 text-xs px-3 py-1.5 rounded-full border border-blue-100 cursor-pointer whitespace-nowrap"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Ввод */}
      <div className="px-4 pb-2 flex gap-2 border-t border-neutral-100 pt-2">
        <div className="flex-1 bg-neutral-100 rounded-2xl flex items-center px-4 gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Напишите сообщение..."
            className="flex-1 bg-transparent text-sm py-3 outline-none text-neutral-800 placeholder-neutral-400"
          />
        </div>
        <button
          onClick={() => send(input)}
          className="w-11 h-11 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer shrink-0 self-end"
        >
          <Icon name="Send" size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
