// components/ChatBox.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Stats {
  tokens_used: number;
  co2_emission: number;
  water_usage: number;
}

interface ChatBoxProps {
  onUpdateStats: (stats: Stats) => void;
}

export default function ChatBox({ onUpdateStats }: ChatBoxProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("/api/chat", { prompt: input });

      const botMessage: Message = {
        role: "assistant",
        content: response.data.message,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Update stats to parent (for water & CO2 visuals)
      onUpdateStats({
        tokens_used: response.data.tokens_used,
        co2_emission: response.data.co2_emission,
        water_usage: response.data.water_usage,
      });
    } catch (error) {
      console.error("API Error:", error);
    }

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.role}>
            {msg.content}
          </p>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
