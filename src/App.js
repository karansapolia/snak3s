import React from 'react';
import './App.css';
import Start from './Start';
import End from './End';
import ScoreCard from './ScoreCard';

class App extends React.Component { 
  
  constructor() {
    super();
    this.state = {
      currentScreen: 'start',
      highestScore: 0,
      currentScore: 0,
      snakeLength: 3,
      snakeBody: [],
      snakePosition: {
        x: 30,
        y: 30
      },
      starPosition: {
        x: 325,
        y: 20
      },
      iteration: 0,
      snakeSpeed: {
        x: 5,
        y: 0
      }
    }

    this.canvasRef = React.createRef();
    this.startGame = this.startGame.bind(this);
  }

  randomNumberGen(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.context = this.canvas.getContext('2d');
    this.anim = requestAnimationFrame(this.startGame);
  }

  startGame() {
    console.log('Startgame triggered');

    this.setState((state) => {
      return {currentScreen: 'playing'}
    });

    if(++this.iteration < 4) {
      return;
    }

    this.iteration = 0;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.snakePosition.x += this.snakeSpeed.x;
    this.snakePosition.y += this.snakeSpeed.y;

    if(this.snakePosition.x < 0) {
      this.snakePosition.x = this.canvas.width - this.snakeSpeed.x;
    }
    else if(this.snakePosition.x >= this.canvas.width) {
      this.snakePosition.x = 0;
    }

    if(this.snakePosition.y < 0) {
      this.snakePosition.y = this.canvas.height - this.snakeSpeed.x;
    }
    else if(this.snakePosition.y >= this.canvas.height) {
      this.snakePosition.y = 0;
    }

    this.snakeBody.unshift({x: this.snakePosition.x, y: this.snakePosition.y});

    if(this.snakeBody.length > this.snakeLength) {
      this.snakeBody.pop();
    }

    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.starPosition.x, this.starPosition.y, this.snakeSpeed.x - 1, this.snakeSpeed.x - 1);

    console.log("First print done!");

    this.context.fillStyle = 'green';
    this.snakeBody.forEach(function(cell, index) {
      this.context.fillRect(cell.x, cell.y, this.snakeSpeed.x - 1, this.snakeSpeed.x - 1);

      if(cell.x === this.starPosition.x && cell.y === this.starPosition.y) {
        this.snakeLength++;
        this.setState((state) => {
          return {currentScore: (state.currentScore + 10)}
        });
        this.starPosition.x = this.randomNumberGen(0, 100) * this.snakeSpeed.x;
        this.starPosition.y = this.randomNumberGen(0, 100) * this.snakeSpeed.x;
      }

      for (var i = index + 1; i < this.snakeBody.length; i++) {
        if (cell.x === this.snakeBody[i].x && cell.y === this.snakeBody[i].y) {
          if(this.highScore < this.currentScore) {
            this.setState((state) => {
              return {highScore: state.currentScore}
            });
          }
          else {
            this.setState((state) => {
              return {highscore: state.highScore}
            });
          }
          this.setState({
            currentScreen: 'stop',
            currentScore: 0,
            snakeLength: 3,
            snakeBody: [],
            snakePosition: {
              x: 160,
              y: 160
            },
            starPosition: {
              x: 320,
              y: 320
            },
            snakeSpeed: {
              x: 16,
              y: 0
            }
          });
        }
      }
    });
    this.anim = requestAnimationFrame(this.startGame);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.anim);
  }

  decideDirection(e) {
    console.log(e);
    if(e.keyCode === 37 && this.snakeSpeed.x === 0) {
      this.snakeSpeed.x = -(this.snakeSpeed.x);
      this.snakeSpeed.y = 0;
    }
    else if(e.keyCode === 38 && this.snakeSpeed.y === 0) {
      this.snakeSpeed.y = -(this.snakeSpeed.x);
      this.snakeSpeed.x = 0;
    }
    else if(e.keyCode === 39 && this.snakeSpeed.x === 0) {
      this.snakeSpeed.x = this.snakeSpeed.x;
      this.snakeSpeed.y = 0;
    }
    else if(e.keyCode === 40 && this.snakeSpeed.y === 0) {
      this.snakeSpeed.y = this.snakeSpeed.x;
      this.snakeSpeed.x = 0;
    }
  }



  setSpeed() {
    
  }

  render() {
    if(this.state.currentScreen === 'start') {
      return(
        <div>
           <canvas
            ref = {this.canvasRef}
            width = {500}
            height = {500}
          />
          <Start 
            startGame = {this.startGame}
          />
        </div>
      );
    }
    if(this.state.currentScreen === 'playing') {
      return(
        <div 
          className="App"
          onKeyDown = {this.decideDirection}  

        >
          <canvas
            ref = {this.canvasRef}
            width = {500}
            height = {500}
          />
          <h2>High Score: </h2><ScoreCard score = {this.state.currentScore} />
          <h2>Current Score: </h2><ScoreCard score = {this.state.highestScore} />
        </div>
      );
    }
    if(this.state.currentScreen === 'stop') {
      return (
        <End
          currentScore = {this.currentScore}
        />
      );
    }
  }
}

export default App;
