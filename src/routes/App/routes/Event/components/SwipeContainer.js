import React, {Component} from 'react';
import styles from './styles/SwipeContainer.css';

export default class SwipeContainer extends Component {

    constructor() {
        super();
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.state = {
            touchY: 0,
            startTime: 0
        };
    }


    touchStart(e) {
        let touchobj = e.changedTouches[0];
        let touchY = touchobj.pageY;
        let startTime = new Date().getTime() // record time when finger first makes contact with surface
        this.setState({
            touchY,
            startTime
        });
        e.preventDefault()
    }

    touchMove(e) {
        e.preventDefault();
    }

    touchEnd(e) {
        let touchobj = e.changedTouches[0];
        let touchY = touchobj.pageY;
        let time = new Date().getTime() // record time when finger first makes contact with surface
        
        let offset = touchY - this.state.touchY;
        let timeDiff = time - this.state.startTime;
        
        if (offset > this.props.offset && timeDiff < this.props.time) {
            this.props.onSwipeDown();
        } else if (offset < -150 && timeDiff < this.props.time) {
            this.props.onSwipeUp();
        }
        e.preventDefault();
    }

    render() {
        return (
            <div onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} className={styles.swipeContainer}>
                {this.props.children}
            </div>
        )
    }
}

SwipeContainer.propTypes = {
    offset: React.PropTypes.number.isRequired,
    time: React.PropTypes.number.isRequired,
    onSwipeUp: React.PropTypes.func.isRequired,
    onSwipeDown: React.PropTypes.func.isRequired
}