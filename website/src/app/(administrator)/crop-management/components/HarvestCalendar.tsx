'use client'

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/solid';

interface Event {
  id: string;
  title: string;
  time: string;
  start: Date;
  end: Date;
  duration: number;
  category: 'Harvest' | 'Planning' | 'Maintenance' | 'Other';
}

const events: Event[] = [
  { id: 'evt001', title: 'Colheita de Milho', start: new Date(2024, 9, 12, 8, 0), end: new Date(2024, 9, 12, 16, 0), category: 'Harvest', time: '08:00 - 16:00', duration: 8 },
  { id: 'evt002', title: 'Manutenção de Colheitadeiras', start: new Date(2024, 9, 13, 9, 0), end: new Date(2024, 9, 13, 12, 0), category: 'Maintenance', time: '09:00 - 12:00', duration: 3 },
  { id: 'evt003', title: 'Colheita de Soja', start: new Date(2024, 9, 14, 7, 0), end: new Date(2024, 9, 14, 18, 0), category: 'Harvest', time: '07:00 - 18:00', duration: 11 },
  { id: 'evt004', title: 'Planejamento Semanal', start: new Date(2024, 9, 15, 10, 0), end: new Date(2024, 9, 15, 11, 0), category: 'Planning', time: '10:00 - 11:00', duration: 1 },
  { id: 'evt005', title: 'Colheita de Trigo', start: new Date(2024, 9, 16, 8, 0), end: new Date(2024, 9, 16, 17, 0), category: 'Harvest', time: '08:00 - 17:00', duration: 9 },
  { id: 'evt006', title: 'Armazenamento de Grãos', start: new Date(2024, 9, 17, 13, 0), end: new Date(2024, 9, 17, 18, 0), category: 'Harvest', time: '13:00 - 18:00', duration: 5 },
  { id: 'evt007', title: 'Colheita de Milho', start: new Date(2024, 9, 18, 7, 0), end: new Date(2024, 9, 18, 19, 0), category: 'Harvest', time: '07:00 - 19:00', duration: 12 },
  { id: 'evt008', title: 'Manutenção de Equipamentos', start: new Date(2024, 9, 19, 8, 0), end: new Date(2024, 9, 19, 12, 0), category: 'Maintenance', time: '08:00 - 12:00', duration: 4 },
  { id: 'evt009', title: 'Colheita de Soja', start: new Date(2024, 9, 20, 7, 0), end: new Date(2024, 9, 20, 18, 0), category: 'Harvest', time: '07:00 - 18:00', duration: 11 },
  { id: 'evt010', title: 'Revisão de Maquinário', start: new Date(2024, 9, 21, 9, 0), end: new Date(2024, 9, 21, 15, 0), category: 'Maintenance', time: '09:00 - 15:00', duration: 6 },
  { id: 'evt011', title: 'Planejamento Mensal', start: new Date(2024, 9, 22, 14, 0), end: new Date(2024, 9, 22, 16, 0), category: 'Planning', time: '14:00 - 16:00', duration: 2 },
  { id: 'evt012', title: 'Colheita de Trigo', start: new Date(2024, 9, 23, 8, 0), end: new Date(2024, 9, 23, 17, 0), category: 'Harvest', time: '08:00 - 17:00', duration: 9 },
  { id: 'evt013', title: 'Armazenamento de Grãos', start: new Date(2024, 9, 24, 13, 0), end: new Date(2024, 9, 24, 18, 0), category: 'Harvest', time: '13:00 - 18:00', duration: 5 },
  { id: 'evt014', title: 'Colheita de Milho', start: new Date(2024, 9, 25, 7, 0), end: new Date(2024, 9, 25, 19, 0), category: 'Harvest', time: '07:00 - 19:00', duration: 12 },
  { id: 'evt015', title: 'Manutenção de Silos', start: new Date(2024, 9, 26, 10, 0), end: new Date(2024, 9, 26, 14, 0), category: 'Maintenance', time: '10:00 - 14:00', duration: 4 },
];

const HarvestCalendar: React.FC = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [selectedPeriod, setSelectedPeriod] = useState<[Date | null, Date | null]>([null, null]);
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const getEventStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case 'harvest': return 'bg-yellow-600 text-black';
      case 'planning': return 'bg-blue-600 text-white';
      case 'maintenance': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const moveDay = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
    setSelectedDay(newDate.getDate());
  };

  const filteredEvents = events.filter(event =>
    event.start.getMonth() === selectedDate.getMonth() &&
    event.start.getFullYear() === selectedDate.getFullYear() &&
    event.start.getDate() === selectedDay
  );

  const timeSlots = Array.from({ length: 19 }, (_, i) => i + 6);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getNextEvent = () => {
    const now = new Date();
    return events.find(event => event.start > now) || null;
  };

  const nextEvent = getNextEvent();

  const handleDateSelection = (day: number) => {
    if (!selectedPeriod[0]) {
      setSelectedPeriod([new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day), null]);
    } else if (!selectedPeriod[1]) {
      const endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      setSelectedPeriod([selectedPeriod[0], endDate]);
    } else {
      setSelectedPeriod([new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day), null]);
    }
    setSelectedDay(day);
  };

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }).map((_, index) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + index);
      return day;
    });
  };

  const weekDaysDates = getWeekDays(selectedDate);

  const formatDatePtBR = (date: Date) => {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${months[date.getMonth()]} de ${date.getFullYear()}`;
  };

  return (
    <div className="flex w-full bg-gray-900 text-white p-4 rounded-lg h-[1050px] mb-12">
      <div className="w-1/4 pr-2 flex flex-col space-y-1" style={{ height: '100%' }}>
        <div className="bg-gray-800 p-8 rounded-lg flex-grow">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            {formatDatePtBR(selectedDate)}
          </h2>
          <div className="grid grid-cols-7 gap-1 mt-6">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs">{day.slice(0, 2)}</div>
            ))}
            {Array.from({ length: getDaysInMonth(selectedDate) }).map((_, index) => {
              const day = index + 1;
              const isSelected = 
                selectedPeriod[0] && selectedPeriod[0].getDate() <= day && 
                (!selectedPeriod[1] || (selectedPeriod[1] && selectedPeriod[1].getDate() >= day));
              return (
                <button
                  key={index}
                  className={`text-center p-1 rounded ${isSelected ? 'bg-green-600' : 'hover:bg-gray-700'}`}
                  onClick={() => handleDateSelection(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg">
          {nextEvent && (
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                Proxima Tarefa:
              </h3>
              <p className='mt-4'>{nextEvent.title}</p>
              <p>{nextEvent.start.toLocaleDateString('pt-BR')} às {nextEvent.time}</p>
            </div>
          )}
        </div>
        <div className="bg-gray-800 p-8 rounded-lg flex-grow">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <TagIcon className="h-5 w-5 mr-2" />
            Legendas
          </h3>
          <div className="flex flex-col space-y-2 mt-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-600 rounded-full mr-2"></div>
              <span>Colheita</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
              <span>Planejamento</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
              <span>Manutenção</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 pl-2">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            {formatDatePtBR(selectedDate)}
          </h1>
          <div className="flex items-center space-x-1">
            <button onClick={() => moveDay(-1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600">
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button className="px-2 py-1 bg-gray-700 rounded text-sm">Hoje</button>
            <button onClick={() => moveDay(1)} className="p-1 rounded-full bg-gray-700 hover:bg-gray-600">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1 mt-8">
          {weekDaysDates.map((currentDay, index) => (
            <div key={index} className={`text-center p-1 rounded ${currentDay.getDate() === selectedDay ? 'bg-gray-700' : ''}`}>
              <div className="text-xs">{weekDays[currentDay.getDay()].slice(0, 3)}</div>
              <div className="text-4xl font-bold">{currentDay.getDate()}</div>
            </div>
          ))}
        </div>

        <div className="relative" style={{ height: 'calc(100% - 80px)' }}>
          {timeSlots.map((hour) => (
            <div key={hour} className="absolute w-full mt-6" style={{ top: `${(hour - 6) * 46}px` }}>
              <div className="grid grid-cols-8">
                <div className="text-xs text-gray-400 pr-1 text-center">{`${hour}:00`}</div>
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div key={dayIndex} className="border-t border-gray-700 h-6"></div>
                ))}
              </div>
            </div>
          ))}

          {filteredEvents.map(event => {
            const hourOffset = event.start.getHours() - 6;
            const minuteOffset = event.start.getMinutes() / 60;

            return (
              <div
                key={event.id}
                className={`absolute p-1 rounded text-xs ${getEventStyle(event.category)}`}
                style={{
                  top: `${(hourOffset + minuteOffset) * 24}px`,
                  left: `calc(14.28% + 24px)`,
                  height: `${event.duration * 24}px`,
                  width: 'calc(14.28% - 4px)',
                  fontSize: '0.5rem'
                }}
              >
                <div className="truncate">{event.title}</div>
                <div>{event.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HarvestCalendar;