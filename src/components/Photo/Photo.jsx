import React from 'react';
import PropTypes from 'prop-types';
import './Photo.css'


const Photo = ({ person, noneChecked }) => {
    const file = require(`../../images/${person.src}`)
    return <img className={`item photo${noneChecked ? ' none-checked' : ''}`} src={file} alt=''/>
}
 
Photo.propTypes = {
    person: PropTypes.shape({}).isRequired,
}

export default Photo;