import React from 'react';

function End(props) {
    return (
        <div>
            <h1>GAME OVER!</h1>
            <h2>You scored: {props.currentScore}</h2>
        </div>
    );
}

export default End;