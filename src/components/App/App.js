import React, { Component } from 'react';

import { TEAM } from '../../constants/team'
import Column from '../../components/Column/Column'
import Divider from '../../components/Divider/Divider'

import './App.css';

const PEOPLE_PER_SHUFFLE = 5

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stillToBeMatchedPeople: TEAM,
      activePeople: [],
      selections: this.initializeSelections(), 
    }
    this.checkForMatch = this.checkForMatch.bind(this)
    this.getNewActivePeople = this.getNewActivePeople.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
    this.initializeSelections = this.initializeSelections.bind(this)
    this.removeMatch = this.removeMatch.bind(this)
  }
  
  checkForMatch() {
    const { selections } = this.state
    const potentialMatch = selections.photo
    for (let category in selections) {
      if(selections[category] !== potentialMatch) return false;
    }
    return true 
  }

  getNewActivePeople() {
    const { stillToBeMatchedPeople } = this.state
    const shuffledTeam = stillToBeMatchedPeople.concat().sort(() => .5 - Math.random()) // shuffle  
    return shuffledTeam.slice(0, PEOPLE_PER_SHUFFLE) //get sub-array of first n elements AFTER shuffle
  }

  handleSelection(selection, type) {
    const stateObject = this.state
    stateObject.selections[type] = selection
    this.setState(stateObject)
    if (this.checkForMatch()) {
      this.removeMatch(selection)
    }
  }

  componentDidMount() {
    this.setState({activePeople:this.getNewActivePeople()})
  }

  componentDidUpdate() {
    if (this.state.activePeople.length === 0) {
      this.setState({activePeople: this.getNewActivePeople()})
    }
  }

  initializeSelections() {
    return {
      photo: null,
      firstName: null,
      lastName: null,
    }
  }

  removeMatch(match) {
    const { activePeople, stillToBeMatchedPeople } = this.state
    this.setState({
      activePeople: activePeople.filter(activePerson => activePerson.src !== match),
      stillToBeMatchedPeople: stillToBeMatchedPeople.filter(activePerson => activePerson.src !== match),
      selections: this.initializeSelections()
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title unselectable">NICHE NAME GAME</h1>
        </header>
        <div className="content-container">
          <div className="column-container">
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
    </div>
  )}
}

export default App;
