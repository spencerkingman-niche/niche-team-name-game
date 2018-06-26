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
        }
        this.handleOptionChange = this.handleOptionChange.bind(this)
    }

    handleOptionChange(e) {
        this.setState({
            selectedOption: e.target.value
        });
    }

    render() {
        const { type, people } = this.props

        const itemComponents = {
            photo: Photo,
            firstName: Word,
            lastName: Word,
            title: Word,
        }
    
        const Item = itemComponents[type]
        console.log(this.state.selectedOption)
        return (
                <form className={ `column column__${type}`}>
                    { people.map(person => 
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
    people: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
 
export default Column;