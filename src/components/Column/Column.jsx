import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Photo from '../Photo/Photo'
import Word from '../Word/Word'

import './Column.css'

class Column extends Component { 
    constructor(props) {
        super(props) 
        this.state = {
            selectedOption: '',
            shuffledActivePeople: this.shuffleActivePeople(),
        }
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.shuffleActivePeople = this.shuffleActivePeople.bind(this)
    }

    handleOptionChange(e) {
        this.setState({
            selectedOption: e.target.value
        })
        this.props.onChange(e.target.value, this.props.type)
    }

    shuffleActivePeople() {
        const shuffledActivePeople = this.props.people.concat().sort(() => .5 - Math.random())
        return shuffledActivePeople
    }

    render() {
        const { type } = this.props

        const itemComponents = {
            photo: Photo,
            firstName: Word,
            lastName: Word,
            title: Word,
        }
    
        const Item = itemComponents[type]
        return (
                <form className={ `column column__${type}`}>
                    { this.state.shuffledActivePeople.map(person => 
                        <div 
                            key={ person.src }
                            className="radio" >
                            <label>
                                <input 
                                    type="radio"
                                    value={ person.src }
                                    checked={ this.state.selectedOption === person.src } 
                                    onChange={ this.handleOptionChange } />
                                <Item 
                                    person={ person }
                                    type={ type } 
                                    noneChecked={ this.state.selectedOption === '' }/>
                            </label>
                        </div>
                    )}
                </form>
        )
    }
    
}

Column.propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    people: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
 
export default Column;