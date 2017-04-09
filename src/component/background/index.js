import React, { Component } from 'react';
import './style.css';

export default class Background extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="bgCarrier">
        <div className="background"
             style={{background: 'hsla(' + this.props.color + ', 30%, 50%, 1)'}}></div>
      </div>
    );
  }
}
