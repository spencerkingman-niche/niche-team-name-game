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
            shuffledActivePeople: [],
        }
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.shuffleActivePeople = this.shuffleActivePeople.bind(this)
    }

    handleOptionChange(e) {
        this.setState({
            selectedOption: e.target.value,
            noneChecked: false,
        })
        this.props.onChange(e.target.value, this.props.type)
    }

    shuffleActivePeople() {
        this.setState({
            selectedOption: '',
            noneChecked: false,
        })
        const shuffledActivePeople = this.props.people.concat().sort(() => .5 - Math.random())
        return shuffledActivePeople
    }

    componentDidUpdate(prevProps) {
        if (prevProps.people.length === 0) {
            this.setState({
                shuffledActivePeople: this.shuffleActivePeople(),
                noneChecked: true,
            })
        }
        if (prevProps.people.length > this.props.people.length) {
            this.setState({
                selectedOption: '',
                noneChecked: true,
            })
        }
    }

// componentDidMount() {
//     this.shuffleActivePeople.bind(this)
// }

    render() {
        const { type, people } = this.props

        const itemComponents = {
            photo: Photo,
            firstName: Word,
            lastName: Word,
            title: Word,
        }
    
        const Item = itemComponents[type]
        return (
            <form className={ `column column__${type}`}>
                { this.state.shuffledActivePeople.map(person => {
                    if (people.indexOf(person) !== -1) {
                        return (

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
                                            numOfPeople={ people.length }
                                            type={ type } 
                                            noneChecked={ this.state.noneChecked }/>
                                    </label>
                                </div>

                        )
                    }
                    return null
                })}
            </form>
        )
    }
    
}

Column.propTypes = {
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    people: PropTypes.arrayOf(PropTypes.shape({})),
}
 
Column.defaultProps = {
    people: [],
}

export default Column;