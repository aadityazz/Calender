import React, { useState } from 'react';
import DayView from './DayView';
import CalendarGrid from './CalenderGrid';
import '../Styles/MonthCalendar.css'; // Import the CSS file for styling

const MonthCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const isDateInPast = (date) => {
        const currentDate = new Date();
        return date <= currentDate;
    };


    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="month-calendar-container">
            <div className="month-calendar">
                <h2>Month Calendar</h2>
                <div className="calendar-and-dayview">
                    <CalendarGrid onDateClick={handleDateClick} />
                </div>
            </div>
            <div className="month-calendar">
                <h2>Slots</h2>
                <div className="calendar-and-dayview">
                    {selectedDate ? (
                        isDateInPast(selectedDate) ? (
                            <p>OOPsss, you have selected an invalid date</p>
                        ) : (
                            <DayView date={selectedDate} />
                        )
                    ) : (
                        <p>Select any date to see slots</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default MonthCalendar;

