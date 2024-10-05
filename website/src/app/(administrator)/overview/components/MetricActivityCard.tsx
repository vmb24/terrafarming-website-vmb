import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Definição dos tipos
interface HistoricalDataPoint {
  day: string;
  value: number;
  date: string;
}

interface MetricActivityCardProps {
  title: string;
  metricValue: number | null;
  metricUnit: string;
  status: string;
  historicalData: HistoricalDataPoint[];
  recommendations: string[];
  createdAt: string;
  color: string;
}

// Função de processamento de dados históricos
function processHistoricalData(data: HistoricalDataPoint[]): HistoricalDataPoint[] {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const processed = new Array(7).fill(null).map((_, index) => ({
    day: daysOfWeek[index],
    value: 0.1, // Valor mínimo para manter o gráfico visível
    date: new Date().toISOString() // Data atual como fallback
  }));

  data.forEach(point => {
    const date = new Date(point.date);
    const dayIndex = date.getDay();
    processed[dayIndex] = { 
      ...point, 
      day: daysOfWeek[dayIndex],
      value: Math.max(point.value, 0.1) // Garante um valor mínimo
    };
  });

  return processed;
}

// Componente MetricActivityCard
const MetricActivityCard: React.FC<MetricActivityCardProps> = ({
  title,
  metricValue,
  metricUnit,
  status,
  historicalData,
  recommendations,
  createdAt,
  color
}) => {
  const processedData = processHistoricalData(historicalData);

  // Encontre o valor máximo nos dados para definir o domínio do eixo Y
  const maxValue = Math.max(...processedData.map(d => d.value), 100);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 max-w-sm">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {/* <div className="bg-gray-100 rounded-full px-6 py-1 flex items-center text-sm">
          <CalendarIcon className="h-4 w-4 mr-1" />
          Last 7 days
        </div> */}
      </div>

      <div className="mb-2">
        <span className="text-4xl font-bold">{metricValue !== null ? metricValue.toFixed(1) : 'N/A'}</span>
        <span className="text-2xl ml-1">{metricUnit}</span>
      </div>

      <p className="text-gray-600 mb-6">Status: {status}</p>
      
      <div className="h-32 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              hide={true}
              domain={[0, maxValue]}
            />
            <Bar 
              dataKey="value" 
              fill={color} 
              radius={[4, 4, 0, 0]}
              minPointSize={2}  // Isso garante que barras com valor zero sejam visíveis
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="font-bold mb-2">Recomendações:</h3>
      <ul className="list-disc pl-5 mb-4 space-y-1">
        {recommendations.map((rec, index) => (
          <li key={index} className="text-sm">{rec}</li>
        ))}
      </ul>
      
      <p className="text-xs text-gray-500">
        Última atualização: {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default MetricActivityCard;