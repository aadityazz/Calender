import React, { useState } from 'react';
import '../Styles/CalendarGrid.css'; // Import the CSS file for styling

const CalendarGrid = ({ onDateClick, minDate }) => {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        onDateClick(date);
    };

    const daysInMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate();

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    );

    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.

    const totalDays = daysInMonth + firstDayOfWeek;
    const weeks = Math.ceil(totalDays / 7);

    // Generate an array of day numbers for the current month
    const dayNumbers = Array.from({ length: totalDays }, (_, index) =>
        index < firstDayOfWeek ? null : index - firstDayOfWeek + 1
    );

    // Generate the table rows and cells for the calendar grid
    const calendarRows = [];
    let dayNumberIndex = 0;

    for (let i = 0; i < weeks; i++) {
        const calendarRow = (
            <tr key={`week-${i}`}>
                {Array.from({ length: 7 }, (_, j) => {
                    const dayNumber = dayNumbers[dayNumberIndex];
                    dayNumberIndex++;

                    if (dayNumber === null) {
                        return <td key={`empty-${j}`} />;
                    }

                    const date = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        dayNumber
                    );

                    const isToday =
                        date.toDateString() === currentDate.toDateString();
                    const isSelected =
                        selectedDate &&
                        date.toDateString() === selectedDate.toDateString();
                    const isPastDate = date < minDate; // Check if the date is in the past

                    return (
                        <td
                            key={`day-${dayNumber}`}
                            onClick={() => !isPastDate && handleDateClick(date)} // Disable past dates
                            className={
                                isToday ? 'today' : isSelected ? 'selected' : isPastDate ? 'past-date' : ''
                            }
                        >
                            {dayNumber}
                        </td>
                    );
                })}
            </tr>
        );

        calendarRows.push(calendarRow);
    }

    return (
        <div className="calendar-grid-container">
            <table className="calendar-grid">
                <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
                </thead>
                <tbody>{calendarRows}</tbody>
            </table>
        </div>
    );
};

export default CalendarGrid;
