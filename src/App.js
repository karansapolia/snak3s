import React from 'react';
import './App.css';
import Start from './Start';
import End from './End';
import ScoreCard from './ScoreCard';

class App extends React.Component { 
  
  constructor(props) {
    super(props);
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
      },
      canvasWidth: 500,
      canvasHeight:500
    };

    this.canvasRef = React.createRef();
    this.startGame = this.startGame.bind(this);
  }

  randomNumberGen(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /*componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.context = this.canvas.getContext('2d');
    this.anim = requestAnimationFrame(this.startGame);
  }*/

  componentDidUpdate() {
    this.canvas = this.canvasRef.current;
    this.context = this.canvas.getContext('2d');
    requestAnimationFrame(this.startGame);
  }

  startGame() {
    console.log('Startgame triggered');

    this.setState((state) => {
      return {currentScreen: 'playing'}
    });

    console.log(this.state.snakePosition.x);

    if(++this.iteration < 4) {
      return;
    }

    this.iteration = 0;
    
    if(this.context && this.canvas) {
      this.context.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    }


    this.setState((state) => {
      return {
        snakePosition: {
          x: state.snakePosition.x+state.snakeSpeed.x,
          y: state.snakePosition.y+state.snakeSpeed.y
        }
      };
    });

    if(this.state.snakePosition.x < 0) {
      this.setState((state) => {
        return {
          snakePosition: {
            x: this.state.canvasWidth - state.snakeSpeed.x,
            y: state.snakePosition.y
          }
        };
      });
    }
    else if(this.state.snakePosition.x >= this.state.canvasWidth) {
      this.setState((state) => {
        return {
          snakePosition: {
            x: 0,
            y: state.snakePosition.y
          }
        };
      });
    }

    if(this.state.snakePosition.y < 0) {
      this.setState((state) => {
        return {
          snakePosition: {
            x: state.snakeSpeed.x,
            y: state.canvasHeight - state.snakeSpeed.x
          }
        };
      });
    }
    else if(this.state.snakePosition.y >= this.state.canvasHeight) {
      this.setState((state) => {
        return {
          snakePosition: {
            x: state.snakeSpeed.x,
            y: 0
          }
        };
      });
    }

    this.setState((state) => {
      return {
        snakeBody: state.snakeBody.unshift({x: state.snakePosition.x, y: state.snakePosition.y})
      };
    });

    if(this.state.snakeBody.length > this.state.snakeLength) {
      this.setState((state) => {
        return {
          snakeBody: state.snakeBody.pop()
        };
      });
    }

    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.state.starPosition.x, this.state.starPosition.y, this.state.snakeSpeed.x - 1, this.state.snakeSpeed.x - 1);

    console.log("First print done!");

    this.context.fillStyle = 'green';
    this.state.snakeBody.forEach(function(cell, index) {
      this.context.fillRect(cell.x, cell.y, this.state.snakeSpeed.x - 1, this.state.snakeSpeed.x - 1);

      if(cell.x === this.state.starPosition.x && cell.y === this.state.starPosition.y) {
        this.setState((state) => {
          return {
            snakeLength: state.snakeLength+1,
            currentScore: (state.currentScore + 10),
            starPosition: {
              x: this.randomNumberGen(0, 100) * state.snakeSpeed.x,
              y: this.randomNumberGen(0, 100) * state.snakeSpeed.x
            }
          };
        });
      }

      for (var i = index + 1; i < this.state.snakeBody.length; i++) {
        if (cell.x === this.state.snakeBody[i].x && cell.y === this.state.snakeBody[i].y) {
          if(this.state.highScore < this.state.currentScore) {
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

  /*componentWillUnmount() {
    cancelAnimationFrame(this.anim);
  }*/

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
          <Start startGame = {this.startGame} />
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
