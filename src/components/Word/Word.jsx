import React from 'react';
import PropTypes from 'prop-types';

import './Word.css'

const Word = ({ person, type, noneChecked }) => <div className={ `item unselectable word word__${type}${noneChecked ? ' none-checked' : ''}` }> { person[type] }</div>
 
Word.propTypes = {
    person: PropTypes.shape({}).isRequired,
    type: PropTypes.string.isRequired,
    noneChecked: PropTypes.bool.isRequired,
}

export default Word;