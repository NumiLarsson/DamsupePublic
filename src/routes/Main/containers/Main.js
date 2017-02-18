import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from 'actions/user';
import { resetMenu } from 'actions/menu';

//TODO: Use css modules
import styles from './styles/Main.css';


class MainScreen extends Component {

    componentWillMount() {
        this.props.resetMenu();
    }

    render() {
        return (
            <div className={styles.mainContent}>
                <header id={styles.mainHeader} className={styles.mainHeader}>
                    <h2 onClick={this.props.signOut}>{this.props.currentEvent}</h2>
                </header>
                {this.props.children}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userId: state.auth.uid,
        currentEvent: state.event.name
    }
}

const mapDispatchToProps = {
    resetMenu,
    signOut
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen);