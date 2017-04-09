import React, { Component } from 'react';
import './style.css';
import loading from '../../svg/loading.svg';

console.log(loading);
export default class Header extends Component {
  render() {
    return (
      <div className="headerCarrier">
        Loading <img src={loading} width="50"/>
      </div>
    );
  }
}
