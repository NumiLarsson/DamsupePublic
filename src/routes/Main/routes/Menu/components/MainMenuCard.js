import React from 'react';
import Close from 'react-icons/lib/md/close';

import styles from './styles/MainMenuCard.css';

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
        <div disabled={props.disabled} ref={(card) => ref = card} className={[styles.mainMenuCard, props.styleClass].join(' ')} onClick={expand}>
            <div className={props.headerStyle}>
                {props.children[0] || props.children}
                {props.open && <Close className={styles.backButton} onClick={close} color="#fff" size="52" />}
            </div>
            {(props.open && props.children[1]) || null}
        </div>
    )
}