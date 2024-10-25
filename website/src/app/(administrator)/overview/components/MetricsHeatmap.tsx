'use client'

import React, { useState, useEffect } from 'react';
import CalendarHeatmap, { ReactCalendarHeatmapValue } from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { format, eachMonthOfInterval, startOfYear, endOfYear, subYears, isSameYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { useTheme } from 'next-themes';

interface DataPoint {
  date: string;
  value: number;
}

interface Metric {
  value: string;
  label: string;
  color: string;
  endpoint: string;
}

const metrics: Metric[] = [
  { value: 'soilMoisture', label: 'Umidade do Solo', color: 'blue', endpoint: '/api/soil-moisture' },
  { value: 'soilTemperature', label: 'Temperatura do Solo', color: 'red', endpoint: '/api/soil-temperature' },
  { value: 'luminosity', label: 'Luminosidade', color: 'yellow', endpoint: '/api/luminosity' },
  { value: 'airHumidity', label: 'Umidade do Ar', color: 'green', endpoint: '/api/air-humidity' },
  { value: 'airTemperature', label: 'Temperatura do Ar', color: 'orange', endpoint: '/api/air-temperature' },
];

const fetchData = async (endpoint: string): Promise<DataPoint[]> => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const MetricsHeatmap: React.FC = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<DataPoint[]>([]);
  const [metric, setMetric] = useState<string>(metrics[0].value);
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'yyyy-MM'));
  const [thisYearCollections, setThisYearCollections] = useState<number>(0);
  const [lastYearCollections, setLastYearCollections] = useState<number>(0);

  const monthOptions = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date())
  }).map(date => ({
    value: format(date, 'yyyy-MM'),
    label: format(date, 'MMMM', { locale: ptBR })
  }));

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .react-calendar-heatmap .color-empty { fill: ${getEmptyColor()} !important; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);

  useEffect(() => {
    const selectedMetric = metrics.find(m => m.value === metric);
    if (selectedMetric) {
      fetchData(selectedMetric.endpoint).then(fetchedData => {
        setData(fetchedData);
        
        const currentYear = new Date().getFullYear();
        const thisYear = fetchedData.filter(d => isSameYear(new Date(d.date), new Date())).length;
        const lastYear = fetchedData.filter(d => !isSameYear(new Date(d.date), new Date())).length;
        
        setThisYearCollections(thisYear);
        setLastYearCollections(lastYear);
      });
    }
  }, [metric]);

  const getColorClass = (value: number | null): string => {
    if (value === null) {
      return 'color-empty';
    }
    const selectedMetric = metrics.find(m => m.value === metric);
    if (selectedMetric) {
      const intensity = Math.min(Math.floor(value / 20), 4);
      return `color-${selectedMetric.color}-${intensity + 1}`;
    }
    return 'color-empty';
  };

  const getColorStyle = (level: number) => {
    const selectedMetric = metrics.find(m => m.value === metric);
    if (selectedMetric) {
      const opacity = 0.2 + (level * 0.2);
      return { backgroundColor: `${selectedMetric.color}`, opacity };
    }
    return {};
  };

  const getEmptyColor = () => {
    return theme === 'dark' ? '#2D3748' : '#EBEDF0';
  };

  return (
    <div className="metrics-heatmap w-full font-sans p-6 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md mt-12">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Métricas</h2>
        <div className="flex items-center space-x-4">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="p-2 text-base border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md"
          >
            {metrics.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <div className="relative inline-block">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 pl-8 pr-10 text-base border bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-md appearance-none"
            >
              {monthOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row space-x-8">
          <div className="mb-2">
            <div className="text-2xl font-bold">{thisYearCollections}</div>
            <div className="text-sm font-semibold">Coletas neste ano</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{lastYearCollections}</div>
            <div className="text-sm font-semibold">Coletas no último ano</div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-sm">Menos</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div key={level} className="w-4 h-4" style={getColorStyle(level)}></div>
          ))}
          <span className="text-sm">Mais</span>
        </div>
      </div>
      <CalendarHeatmap
        startDate={subYears(new Date(), 1)}
        endDate={new Date()}
        values={data}
        classForValue={(value: ReactCalendarHeatmapValue<string> | undefined) => {  // Altere de "DataPoint | null" para "DataPoint | undefined"
          if (!value) {
            return 'color-empty';
          }
          return getColorClass(value.value);  // Aqui, o valor será tratado corretamente
        }}
        tooltipDataAttrs={(value: DataPoint | undefined) => {  // Altere também aqui
          if (!value || !value.date) {
            return { 'data-tooltip-id': "calendar-tooltip", 'data-tooltip-content': 'Sem dados' };
          }
          return {
            'data-tooltip-id': "calendar-tooltip",
            'data-tooltip-content': `${format(new Date(value.date), 'dd/MM/yyyy')}: ${value.value} ${metrics.find(m => m.value === metric)?.label}`,
          };
        }}
        transformDayElement={(element, value, index) => {
          if (!value) {
            return React.cloneElement(element, {
              ...element.props,
              style: { ...element.props.style, fill: getEmptyColor() }
            });
          }
          return element;
        }}
      />
      <ReactTooltip id="calendar-tooltip" />
    </div>
  );
};

export default MetricsHeatmap;