import React from 'react';
import HourGlass from './Hourglass';
import './styles/Splash.css';

export default function SplashScreen(props) {
    return (
        <div className="splash-screen">
            <div className="splash-screen__header">
                <h1 className="splash-screen__header__title">Damsupe VT17</h1>
            </div>
            <HourGlass width="80" height="80" />
            <h1 className="splash-screen__header__title">08/04/17</h1>
            
        </div>
    )
}