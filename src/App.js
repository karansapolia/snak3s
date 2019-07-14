import React from 'react';
import logo from './logo.svg';
import './App.css';
import Start from './Start';
import ScoreCard from './ScoreCard';

class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      size: 500,
      currentScreen: 'start',
      highestScore: 0,
      currentScore: 0,
      snakeLength: 3,
      snakeBody: [],
      startPosition: {
        x: 30,
        y: 30
      },
      speed: 5
    }
  }

  randomNumberGen(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  startGame() {
    this.setState({
      currentScreen: 'playing'
    });
  }


  setSpeed() {
    
  }

  render() {
    if(this.state.currentScreen === "start") {
      return(
        <Start 
          startGame = {this.startGame}
        />
      );
    }
    else if(this.state.currentScreen === "playing") {
      return(
        <div className="App">
          <canvas
            className = "canvas"
            height = {this.state.size}
            width = {this.state.size}
          ></canvas>
          <ScoreCard score = {this.state.currentScore} />
          <ScoreCard score = {this.state.highestScore} />
    
        </div>
      );
    }
  }
}

export default App;
