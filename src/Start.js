import React from 'react';

class Start extends React.Component {
    render() {
        return (
            <button
                className = "start-button"
                type = "button"
                onClick = {this.props.startGame}
            >
                Play Snak3s!
            </button>
        );

    }
}

export default Start;