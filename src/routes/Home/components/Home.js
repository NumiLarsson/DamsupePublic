import React from 'react';
import { Link } from 'react-router'

//TODO: Use css modules.
import './styles/Home.css';

function HomeScreen(props) {
    return (
        <div className="homeScreen">
            <h1>DAMSUPE VT17</h1>
            <div className="divider">
            </div>
            <nav className="nav">
                <div className="linkWrapper">
                    <Link to="/register" className="emphesizedLink">JOIN</Link>
                </div>
                <span className="verticalDivider"></span>
                <div className="linkWrapper">
                    <Link to="/login" className="emphesizedLink">LOGIN</Link>
                </div>
            </nav>
        </div>
    )
}

module.exports = HomeScreen;