// pages/history.tsx

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface ApiUsage {
  id: string;
  tokens_used: number;
  api_calls: number;
  co2_emission: number;
  water_usage: number;
  created_at: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function History() {
  const [usage, setUsage] = useState<ApiUsage[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('api_usage')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setUsage(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>API Usage History</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Tokens Used</th>
            <th>CO₂ (g)</th>
            <th>Water (L)</th>
          </tr>
        </thead>
        <tbody>
          {usage.map((entry) => (
            <tr key={entry.id}>
              <td>{new Date(entry.created_at).toLocaleString()}</td>
              <td>{entry.tokens_used}</td>
              <td>{entry.co2_emission.toFixed(2)}</td>
              <td>{entry.water_usage.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
