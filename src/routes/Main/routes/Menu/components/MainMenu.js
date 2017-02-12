import React, {Component} from 'react';
import Announcement from 'react-icons/lib/md/announcement';
import Face from 'react-icons/lib/md/face';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './styles/MainMenu.css';

class MainMenu extends Component  {

    render() {
        return (
            <div className="main-menu">
                <div className="main-menu__card first">
                    <Announcement  color="#fff" size="72" />
                </div>
                <div className="main-menu__card second">
                    <Announcement color="#fff" size="72" />
                </div>
                <div className="main-menu__card third">
                    <Announcement color="#fff" size="72" />
                </div>
                <div className="main-menu__card fourth">
                    <Face color="#fff" size="72" />
                    <div className="user-info">
                        <span className="user-info__name">{trimName(this.props.userName)}</span>
                    </div>
                </div>
            </div>
        )
    }
    
}

function trimName(name) {
    if(name.length > 20) {
        return name.substr(0, 20) + '...';
    }
    return name;
} 


const mapStateToProps = (state) => {
    return {
        userName: state.auth.name
    }
}

const mapDispatchToProps = {

}


module.exports = connect(mapStateToProps, null)(MainMenu);