import React, { Component } from 'react';
import Loader from './Loader';
import './styles/Main.css';

class MainScreen extends Component {

    render() {
        let content;
        let { children } = this.props;

        if (children) {
            content = children;
        } else {
            content = (
                <div className="main-screen">
                   
                </div>
            )
        }
        return content;
    }
}

module.exports = MainScreen;

/*
 <Loader> 
                        <div className="spinner">
                            <div className="dot1"></div>
                            <div className="dot2"></div>
                        </div>
                    </Loader> */