import React, { Component } from 'react';
import { connect } from 'react-redux';
import  MiniLoader  from 'components/Loader/MiniLoader';
import { Link } from 'react-router';

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
                    <div className={styles.nav}>
                        {!this.props.loading && <Link className={styles.emphesizedLink} to="/app/eventlist">ENTER</Link>}
                    </div>
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