import React, { Component } from 'react';
import Background from './component/background';
import Header from './component/header';
import Game from './component/game';

const data = require('./data.json');

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

import './App.css';

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class App extends Component {
  constructor(props){
    super(props);
    console.log(data);
    this.state = { currentLevel: undefined, color: 0 };
  }
  componentDidMount(){
    this.playLevel(rand(0, data.levels.length - 1));
  }

  playLevel(i){
    this.setState({currentLevel: i, color: rand(0,360)});
  }


  render() {
    return (
      <div className="App">
        <Background color={this.state.color}/>
        <div className="carrier">
          { (this.state.currentLevel != undefined) &&
              <Game color={this.state.color}
                    game={data.levels[this.state.currentLevel]}
                    key={data.levels[this.state.currentLevel].q + rand(0,65536)}
                    alphabet={data.alphabet}
                    playNext={() => {
                      this.playLevel(rand(0, data.levels.length - 1));
                    }}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
