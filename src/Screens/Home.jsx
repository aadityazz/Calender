import React, {  useContext } from 'react';
import MonthCalendar from './MonthCalendar';
import ParentComponent from "./ParentComponent";
import { UserContext } from "../UserContext";
import {Navigate} from "react-router-dom";
import '../Styles/Home.css';

const Home = () => {

    const { userInfo, setUserInfo } = useContext(UserContext);
   // console.log(userInfo);

    if (!userInfo || Object.keys(userInfo).length === 0) {
        return <Navigate to={'/login'} />;
    }

    return (
        <div className="home">
            <div className="section">
                <ParentComponent />
            </div>
            <div className="section2">
                <MonthCalendar />
            </div>
        </div>
    );
};

export default Home;
