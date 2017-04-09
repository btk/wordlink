import React, { Component } from 'react';
import './style.css';

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default class Game extends Component {
  constructor(props){
    super(props);
    //this.props.game;
    this.alphabet = this.props.alphabet;
    this.initialGPA = [];
    this.initialAnswerGPA = [];
    this.createGamePadArray();
  }

  createGamePadArray = () => {
    let gamePadArray = [];
    gamePadArray = gamePadArray.concat(this.props.game.a.split(""));
    let randLetterNeeded = 20 - gamePadArray.length;
    for(let i = 0; i < randLetterNeeded; i++){
      gamePadArray.push(this.alphabet.split("")[rand(0, this.alphabet.length)]);
    }
    gamePadArray = this.shuffle(gamePadArray);
    this.initialGPA = JSON.parse(JSON.stringify(gamePadArray));
    this.createGameAnswerArray(gamePadArray);
  }

  createGameAnswerArray = (gpa) => {
    let gaa = [];
    this.props.game.a.split("").forEach((l) => {
      gaa.push("");
    });
    this.initialAnswerGPA = JSON.parse(JSON.stringify(gaa));;
    this.createStates(gpa, gaa);
  }

  createStates = (gamePadArray, gameAnswerArray) => {
    this.state = {gamePadArray, gameAnswerArray};
  }



  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  pushToAnswer = (letter) => {
    let updatedGameAnswerArray = this.state.gameAnswerArray;
    let i = 0;
    while(1){
      if(updatedGameAnswerArray[i] == ""){
        updatedGameAnswerArray[i] = letter;
        this.setState({gameAnswerArray: updatedGameAnswerArray});
        break;
      }
      i++;
    }
  }


  pressed = (i, letter)  => {
    // when i. letter is pressed
    let gpa = this.state.gamePadArray;
    gpa[i] = "";
    this.setState({gamePadArray: gpa});
    this.pushToAnswer(letter);
    this.checkGame();
  }

  checkGame = () => {
    let trueAnswer = this.props.game.a;
    let currentAnswer = this.state.gameAnswerArray.join("");
    if(trueAnswer == currentAnswer){
      console.log("GameOver");
      this.props.playNext();
    } else {
      console.log("currentAns", currentAnswer);
    }
  }

  reloadGame = () => {
    console.log("reload");
    this.initialGPA = JSON.parse(JSON.stringify(this.initialGPA));
    this.initialAnswerGPA = JSON.parse(JSON.stringify(this.initialAnswerGPA));
    this.setState({
      gamePadArray: this.initialGPA,
      gameAnswerArray: this.initialAnswerGPA
    });
    this.initialGPA = JSON.parse(JSON.stringify(this.initialGPA));
    this.initialAnswerGPA = JSON.parse(JSON.stringify(this.initialAnswerGPA));
  }

  render() {
    return (
      <div className="gameCarrier">
        <div className="gameTop">
          <div className="genericText">
            What is the first word that commonly comes to mind when people says this word?
          </div>
          <div className="theWord">
            <div className="theWordInner"
                 style={{background: 'hsla(' +this.props.color+ ', 40%, 40%, 1'}}>{this.props.game.q}</div>
          </div>
        </div>
        <div className="gameBottom" style={{boxShadow: '0px 0px 30px 0px  hsla(' +this.props.color+ ', 40%, 40%, 0.4'}}>
          <div className="gameInput">
            {this.state.gameAnswerArray.map((letter, i) => (
               <div className={['letter', (!letter)?' empty':''].join(" ")}
                    key={i}
                    ref={"la"+i}>{letter}</div>
            ))}
            <div className="letter" onClick={this.reloadGame}>&#8635;</div>
          </div>
          <div className="gamePad">
            {this.state.gamePadArray.map((letter, i) =>(
               <div className={['letter', (!letter)?' empty':''].join(" ")}
                    key={i}
                    ref={"l"+i}
                    onClick={() => { (letter)? this.pressed(i, letter) :""; }}>{letter}</div>))
            }
          </div>
        </div>
      </div>
    );
  }
}
