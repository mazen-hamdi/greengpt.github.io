// components/ChatBox.tsx

import { useState } from 'react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Stats {
  tokens_used: number;
  co2_emission: number;
  water_usage: number;
}

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({
    tokens_used: 0,
    co2_emission: 0,
    water_usage: 0,
  });

  const handleSend = async () => {
    if (!input) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post('/api/chat', { prompt: input });
      const { message, tokens_used, co2_emission, water_usage } = response.data;

      const botMessage: Message = {
        role: 'assistant',
        content: message,
      };

      setMessages((prev) => [...prev, botMessage]);
      setStats({
        tokens_used,
        co2_emission,
        water_usage,
      });
    } catch (error) {
      console.error(error);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, idx) => (
          <p key={idx} className={msg.role}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}: </strong>
            {msg.content}
          </p>
        ))}
      </div>

      <div className="stats">
        <p>Tokens Used: {stats.tokens_used}</p>
        <p>CO₂ Emissions: {stats.co2_emission.toFixed(2)} g</p>
        <p>Water Usage: {stats.water_usage.toFixed(2)} L</p>
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
