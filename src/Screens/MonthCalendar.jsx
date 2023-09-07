import React, { useState } from 'react';
import DayView from './DayView';
import CalendarGrid from "./CalenderGrid";

const MonthCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="month-calendar">
            <h2>Month Calendar</h2>
            <CalendarGrid onDateClick={handleDateClick} />
            {selectedDate && <DayView date={selectedDate} />}
        </div>
    );
};

export default MonthCalendar;
