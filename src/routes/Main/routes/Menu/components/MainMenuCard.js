import React from 'react';
import Close from 'react-icons/lib/md/close';


export default props => {

    let ref = null;

    function expand() {
        props.expandCard(ref, !props.open, props.openAction);
    }

    function close() {
        props.closeCard(ref, props.closeAction);
    }

    return (
        <div ref={(card) => ref = card} className={'mainMenuCard ' + props.styleClass} onClick={expand}>
            <div className="cardHeader">
                {props.children[0] || props.children}
                {props.open && <Close className="backButton" onClick={close} color="#fff" size="52" />}
            </div>
            {(props.open && props.children[1]) || null}
        </div>
    )
}