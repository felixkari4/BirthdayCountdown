import React, { Component } from 'react';
import BirthDayForm from "./BirthDayForm";
import {Clock} from "./Clock" 

export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Birthday Countdown</h1>
          <div className="header-skew">
            <div className="header-subSkew">
            
           
            </div>
          </div>
       
        </header>
         <BirthDayForm />
      </div>

    );
  }
}
