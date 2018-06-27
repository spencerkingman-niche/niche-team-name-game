import React from 'react';
import PropTypes from 'prop-types';

import './Word.css'

const Word = ({ person, type, noneChecked }) => <div className={ `item unselectable word word__${type}${noneChecked ? ' none-checked' : ''}` }> { person[type] }</div>
 
export default Word;