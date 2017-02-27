import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import  MiniLoader  from 'components/Loader/MiniLoader';

//Styles
import styles from './styles/Home.css';

class HomeScreen extends Component {

    render() {
        return (
                <div className={styles.homeContent}>
                    <h1>Smalands Events</h1>
                    <div className={styles.divider}>
                        {this.props.loading && <MiniLoader show={true} />}
                    </div>
                    {!this.props.loading && !this.props.authed &&
                        <nav className={styles.nav}>
                            <div className={styles.linkWrapper}>
                                <Link to="/register" className={styles.emphesizedLink}>JOIN</Link>
                            </div>
                            <span className={styles.verticalDivider}></span>
                            <div className={styles.linkWrapper}>
                                <Link to="/login" className={styles.emphesizedLink}>LOGIN</Link>
                            </div>
                        </nav>
                    }
                </div>
            )
        }
    }

const mapStateToProps = state => {
    return {
        loading: state.app.get('loading'),
        authed: state.auth.get('authenticated')
    }
}

module.exports = connect(mapStateToProps, null)(HomeScreen);