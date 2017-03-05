import React from 'react';
import Close from 'react-icons/lib/md/close';
import styles from './styles/EventMenuCard.css';

export default props => {

    let ref = null;

    function expand() {
        if (!props.disabled) {
            props.expandCard(ref, !props.open, props.openAction);
        }
    }

    function close() {
        props.closeCard(ref, props.closeAction);
    }

    return (
        <div disabled={props.disabled} ref={(card) => ref = card} className={styles.eventMenuCard} onClick={expand}>
            <div className={styles.headerImgContainer} style={{backgroundImage: `url(${props.image})`}}>
                {props.open && <Close className={styles.backButton} onClick={close} color="#fff" size="48" />}
                <span className={styles.headerTitle}><h3>{props.title}</h3></span>
            </div>
            <div className={styles.content}>
                {!props.open &&
                    <p className={styles.description}>
                        Description goes here.
                    </p>
                }
               {props.open && 
                props.children
               }
            </div>
        </div>
    )
}