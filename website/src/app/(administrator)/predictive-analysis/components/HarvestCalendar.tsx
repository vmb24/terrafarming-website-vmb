'use client'

import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface Event {
  id: string;
  title: string;
  time: string;
  date: Date;
  duration: number;
  type: 'harvest' | 'planning' | 'maintenance' | 'other';
}

const events: Event[] = [
  { id: '1', title: 'Harvest Corn', time: '08:00', date: new Date(2024, 9, 5), duration: 3, type: 'harvest' },
  { id: '2', title: 'Plan Winter Crops', time: '14:00', date: new Date(2024, 9, 2), duration: 2, type: 'planning' },
  { id: '3', title: 'Tractor Maintenance', time: '10:00', date: new Date(2024, 9, 1), duration: 4, type: 'maintenance' },
  { id: '4', title: 'Irrigation Check', time: '09:00', date: new Date(2024, 9, 3), duration: 2, type: 'maintenance' },
  { id: '5', title: 'Harvest Potatoes', time: '07:00', date: new Date(2024, 9, 4), duration: 5, type: 'harvest' },
  { id: '6', title: 'Soil Analysis', time: '11:00', date: new Date(2024, 9, 2), duration: 3, type: 'other' },
  { id: '7', title: 'Equipment Repair', time: '13:00', date: new Date(2024, 9, 5), duration: 4, type: 'maintenance' },
  { id: '8', title: 'Crop Rotation Meeting', time: '15:00', date: new Date(2024, 9, 3), duration: 2, type: 'planning' },
  { id: '9', title: 'Pesticide Application', time: '06:00', date: new Date(2024, 9, 4), duration: 3, type: 'other' },
  { id: '10', title: 'Harvest Review', time: '16:00', date: new Date(2024, 9, 5), duration: 2, type: 'planning' },
];

const HarvestCalendar: React.FC = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  const [startDay, setStartDay] = useState(1);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'harvest': return 'bg-green-600 text-white';
      case 'planning': return 'bg-blue-600 text-white';
      case 'maintenance': return 'bg-yellow-600 text-black';
      default: return 'bg-gray-600 text-white';
    }
  };

  const moveCalendar = (direction: number) => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    let newStartDay = startDay + direction * 7;
    
    if (newStartDay < 1) {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
      newStartDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0).getDate() + newStartDay;
    } else if (newStartDay > daysInMonth) {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
      newStartDay = newStartDay - daysInMonth;
    }
    
    setStartDay(newStartDay);
  };

  const filteredEvents = events.filter(event => 
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear() &&
    event.date.getDate() >= startDay &&
    event.date.getDate() < startDay + 7
  );

  const timeSlots = Array.from({ length: 13 }, (_, i) => i + 6);

  return (
    <div className="w-full bg-gray-800 text-white p-4 mb-8 rounded-md">
      <h1 className="text-2xl font-semibold text-start my-4">Calendário de Colheita Otimizado</h1>
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center space-x-2">
            <select
              value={selectedDate.getFullYear()}
              onChange={(e) => setSelectedDate(new Date(parseInt(e.target.value), selectedDate.getMonth(), 1))}
              className="bg-gray-800 text-white px-2 py-4 rounded"
            >
              {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <button onClick={() => moveCalendar(-1)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button onClick={() => moveCalendar(1)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-1 mb-2">
          <div className="text-center w-8"></div>
          {weekDays.map((day, index) => {
            const currentDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), startDay + index);
            return (
              <div key={day} className="text-center">
                <div className="text-lg font-bold">{day}</div>
                <div className="text-3xl font-bold">{currentDay.getDate()}</div>
              </div>
            );
          })}
        </div>

        <div className="relative" style={{ height: '600px' }}>
          {timeSlots.map((hour) => (
            <div key={hour} className="absolute w-full" style={{ top: `${(hour - 6) * 46}px` }}>
              <div className="grid grid-cols-8">
                <div className="text-xs text-gray-400 pr-1 text-right w-8">{`${hour}:00`}</div>
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div key={dayIndex} className="border-t border-gray-700 h-11"></div>
                ))}
              </div>
            </div>
          ))}

          {filteredEvents.map(event => {
            const dayIndex = event.date.getDate() - startDay;
            const hourOffset = parseInt(event.time.split(':')[0]) - 6;
            const minuteOffset = parseInt(event.time.split(':')[1]) / 60;

            return (
              <div
                key={event.id}
                className={`absolute p-1 rounded text-xs ${getEventStyle(event.type)}`}
                style={{
                  top: `${(hourOffset + minuteOffset) * 46}px`,
                  left: `calc(${(dayIndex + 1) * 12.5}% + 32px)`,
                  height: `${event.duration * 46}px`,
                  width: 'calc(12.5% - 8px)',
                  fontSize: '0.6rem'
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