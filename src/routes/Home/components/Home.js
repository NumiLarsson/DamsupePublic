import React from 'react';
import { Link } from 'react-router'
import './styles/Home.css';

function HomeScreen(props) {
    return (
        <div className="home-screen">
            <h1>DAMSUPE VT17</h1>
            <div className="divider">
            </div>
            <nav className="nav">
                <div className="link-wrapper">
                    <Link to="/register" className="emphesized-link">JOIN</Link>
                </div>
                <span className="vertical-divider"></span>
                <div className="link-wrapper">
                    <Link to="/login" className="emphesized-link">LOGIN</Link>
                </div>
            </nav>
        </div>
    )
}

module.exports = HomeScreen;