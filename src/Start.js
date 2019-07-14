import React from 'react';

function Start(props) {
    return (
        <button
            className = "start-button"
            type = "button"
            onClick = {props.startGame}
        >
            Play Snak3s!
        </button>
    );
}

export default Start;