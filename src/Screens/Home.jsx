// Home.js

import React from 'react';
import MonthCalendar from './MonthCalendar';
import Slot from './Slot';
import Profile from './Profile';
import ParentComponent from "./ParentComponent";

const styles = {
    home: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyItems: 'center',
        padding: '20px',
    },
    section: {
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    section2: {
        margin: '20px',
        padding: '20px',
    },
    header: {
        fontSize: '24px',
        marginBottom: '10px',
    },
};

const Home = () => {
    return (
        <div style={styles.home}>
            <div style={styles.section}>
                <ParentComponent />
            </div>
            <div style={styles.section2}>
                <MonthCalendar />
            </div>
        </div>
    );
};

export default Home;
