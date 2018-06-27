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
      selections: this.initializeSelections(), 
    }
    this.getNewActivePeople = this.getNewActivePeople.bind(this)
    this.initializeSelections = this.initializeSelections.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
  }
  
  getNewActivePeople() {
    const shuffledTeam = TEAM.sort(() => .5 - Math.random()) // shuffle  
    return shuffledTeam.slice(0, PEOPLE_PER_SHUFFLE) //get sub-array of first n elements AFTER shuffle
  }

  handleSelection(selection, type) {
    const stateObject = this.state
    stateObject.selections[type] = selection
    this.setState(stateObject)
    console.log(this.state.selections)
  }

  initializeSelections() {
    return {
      photo: null,
      firstName: null,
      lastName: null,
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title unselectable">NICHE NAME GAME</h1>
        </header>
        <div className="App-container">
          <Column
            type="photo"
            people={ this.state.activePeople }
            onChange={ this.handleSelection } 
            />
          <Divider/>
          <Column
            type="firstName"
            people={ this.state.activePeople }
            onChange={ this.handleSelection } 
            />
          <Divider/>
          <Column
            type="lastName"
            people={ this.state.activePeople }
            onChange={ this.handleSelection } 
            />
        </div>
      </div>
    );
  }
}

export default App;
