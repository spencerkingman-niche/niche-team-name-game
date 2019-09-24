import React, { Component } from "react";
import { TEAM } from "../../constants/team";
import Column from "../../components/Column/Column";
import Divider from "../../components/Divider/Divider";
import LastCorrect from "../../components/LastCorrect/LastCorrect";
import "./App.css";

const DEFAULT_PEOPLE_PER_SHUFFLE = 5;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peoplePerShuffle: DEFAULT_PEOPLE_PER_SHUFFLE,
      stillToBeMatchedPeople: TEAM,
      activePeople: [],
      selections: this.initializeSelections(),
      lastCorrect: {},
    };
    this.checkForMatch = this.checkForMatch.bind(this);
    this.getNewActivePeople = this.getNewActivePeople.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSkipClick = this.handleSkipClick.bind(this);
    this.initializeSelections = this.initializeSelections.bind(this);
    this.removeMatch = this.removeMatch.bind(this);
  }

  checkForMatch() {
    const { activePeople, selections } = this.state;
    if (!selections.photo || !selections.firstName || !selections.lastName) {
      return false
    }

    const potentialMatchBasedOnPhoto = activePeople.filter(
      activePerson => activePerson.src === selections.photo
    )[0]

    const potentialMatchBasedOnFirstName = activePeople.filter(
      activePerson => activePerson.src === selections.firstName
    )[0] 

    const potentialMatchBasedOnLastName = activePeople.filter(
      activePerson => activePerson.src === selections.lastName
    )[0] 

    if (potentialMatchBasedOnPhoto.firstName === potentialMatchBasedOnFirstName.firstName && potentialMatchBasedOnPhoto.lastName === potentialMatchBasedOnLastName.lastName) {
      return true
    }

    return false;
  }

  getNewActivePeople() {
    const { peoplePerShuffle, stillToBeMatchedPeople } = this.state;
    const shuffledTeam = stillToBeMatchedPeople
      .concat()
      .sort(() => 0.5 - Math.random()); // shuffle
    return shuffledTeam.slice(0, peoplePerShuffle); //get sub-array of first n elements AFTER shuffle
  }

  handleSelectChange(e) {
    this.setState({
      peoplePerShuffle: e.target.value,
      stillToBeMatchedPeople: TEAM,
      activePeople: [],
      selections: this.initializeSelections()
    });
  }

  handleSelection(selection, type) {
    const stateObj = this.state;
    stateObj.selections[type] = selection;
    this.setState(stateObj);
    if (this.checkForMatch()) {
      this.removeMatch(stateObj.selections.photo);
    }
  }

  handleSkipClick() {
    const { activePeople, stillToBeMatchedPeople } = this.state;
    const activePeopleSrc = activePeople.map(activePerson => activePerson.src);
    this.setState({
      activePeople: [],
      stillToBeMatchedPeople: stillToBeMatchedPeople.filter(
        activePerson => !activePeopleSrc.includes(activePerson.src)
      ),
      selections: this.initializeSelections()
    });
  }

  componentDidMount() {
    this.setState({ activePeople: this.getNewActivePeople() });
  }

  componentDidUpdate() {
    if (
      this.state.activePeople.length === 0 &&
      this.state.stillToBeMatchedPeople.length !== 0
    ) {
      this.setState({ activePeople: this.getNewActivePeople() });
    }
  }

  initializeSelections() {
    return {
      photo: null,
      firstName: null,
      lastName: null
    };
  }

  removeMatch(match) {
    const { activePeople, stillToBeMatchedPeople } = this.state;
    
    this.setState({
      activePeople: activePeople.filter(
        activePerson => activePerson.src !== match
      ),
      lastCorrect: activePeople.filter(
        activePerson => activePerson.src === match
      )[0],
      stillToBeMatchedPeople: stillToBeMatchedPeople.filter(
        activePerson => activePerson.src !== match
      ),
      selections: this.initializeSelections()
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header__controls-container">
            <button
              type="button"
              className="App-header__skip-button"
              onClick={this.handleSkipClick}
            >
              Skip This Page
            </button>
            <p className="App-header__label unselectable">Photos Per Page: </p>
            <select
              className="App-header__select"
              defaultValue={DEFAULT_PEOPLE_PER_SHUFFLE}
              onChange={this.handleSelectChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <h1 className="App-title unselectable">NICHE NAME GAME</h1>
        </header>
        <div className="content-container">
          {this.state.stillToBeMatchedPeople.length !== 0 &&
            <div className="column-container">
              <Column
                type="photo"
                people={this.state.activePeople}
                onChange={this.handleSelection}
              />
              <Divider />
              <Column
                type="firstName"
                people={this.state.activePeople}
                onChange={this.handleSelection}
              />
              <Divider />
              <Column
                type="lastName"
                people={this.state.activePeople}
                onChange={this.handleSelection}
              />
              <LastCorrect lastCorrect={this.state.lastCorrect}/>
            </div>
          }
          <div
            className={`game-over-text__wrap ${
              this.state.stillToBeMatchedPeople.length === 0
                ? " visible"
                : " hidden"
            }`}
          >
            <span className="game-over-text">
              Congratulations! You're Finished.
            </span>
            <span className="game-over-text game-over-text--small ">
              (except for the newest of new people).
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
