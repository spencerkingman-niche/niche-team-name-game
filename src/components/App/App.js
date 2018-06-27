import React, { Component } from 'react';
import { TEAM } from '../../constants/team'
import Column from '../../components/Column/Column'
import Divider from '../../components/Divider/Divider'
import './App.css';

const PEOPLE_PER_SHUFFLE = 4

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePeople: this.getNewActivePeople(),
    }
    this.getNewActivePeople = this.getNewActivePeople.bind(this)
    this.shuffleActivePeople = this.shuffleActivePeople.bind(this)
  }
  
  getNewActivePeople() {
    const shuffledTeam = TEAM.sort(() => .5 - Math.random()) // shuffle  
    return shuffledTeam.slice(0, PEOPLE_PER_SHUFFLE) //get sub-array of first n elements AFTER shuffle
  }

  shuffleActivePeople() {
    const shuffledActivePeople = this.state.activePeople.concat().sort(() => .5 - Math.random())
    return shuffledActivePeople
  }

  render() {
    console.log(this.getNewActivePeople())
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title unselectable">NICHE NAME GAME</h1>
        </header>
        <div className="App-container">
          <Column
            type="photo"
            people={ this.shuffleActivePeople() }
            />
          <Divider/>
          <Column
            type="firstName"
            people={ this.shuffleActivePeople() }
            />
          <Divider/>
          <Column
            type="lastName"
            people={ this.shuffleActivePeople() }
            />
        </div>
      </div>
    );
  }
}

export default App;
