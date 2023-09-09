import React, { useState } from 'react';
import DayView from './DayView';
import CalendarGrid from './CalenderGrid';
import '../Styles/MonthCalendar.css';
import { useContext } from "react";
import { UserContext } from "../UserContext";
import SlotCreationForm from "./SlotCreationForm";

const MonthCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const admin = userInfo && userInfo.user ? userInfo.user.isAdmin : null;


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
            {userInfo && admin ? (
                <div>
                        {selectedDate ? (
                            isDateInPast(selectedDate) ? (
                                <p>Oops, you have selected an invalid date</p>
                            ) : (
                                <div>
                                    <SlotCreationForm date={selectedDate}/>
                                    <DayView date={selectedDate} admin = {admin}/>
                                </div>
                            )

                        ) : (
                            <p>Select any date to see slots</p>
                        )}
                </div>
            ):(
                <div>
                    <div className="calendar-and-dayview">
                        {selectedDate ? (
                            isDateInPast(selectedDate) ? (
                                <p>Oops, you have selected an invalid date</p>
                            ) : (
                                <DayView date={selectedDate} />
                            )
                        ) : (
                            <p>Select any date to see slots</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthCalendar;
