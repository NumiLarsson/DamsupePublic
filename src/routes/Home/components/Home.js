import React, { Component } from 'react';
import { Link } from 'react-router'
import { enter, leave } from 'utils/animations';

//TODO: Use css modules.
import styles from './styles/Home.css';

class HomeScreen extends Component {

    componentWillEnter(callback) {
        enter(this.container, 0.4, 'left', callback);
    }

    componentWillLeave(callback) {
        leave(this.container, 0.4, 'left', callback);
    }


    render() {
        return (
                <div ref={container => this.container = container} className={styles.homeScreen}>
                    <h1>DAMSUPE VT17</h1>
                    <div className={styles.divider}>
                    </div>
                    <nav className={styles.nav}>
                        <div className={styles.linkWrapper}>
                            <Link to="/register" className={styles.emphesizedLink}>JOIN</Link>
                        </div>
                        <span className={styles.verticalDivider}></span>
                        <div className={styles.linkWrapper}>
                            <Link to="/login" className={styles.emphesizedLink}>LOGIN</Link>
                        </div>
                    </nav>
                </div>
            )
        }
    }

module.exports = HomeScreen;