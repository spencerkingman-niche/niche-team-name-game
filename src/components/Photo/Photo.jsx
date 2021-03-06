import React from 'react';
import PropTypes from 'prop-types';
import './Photo.css'


const Photo = ({ person, noneChecked, numOfPeople }) => {
    const file = require(`../../images/${person.src}`)
    return <img className={`item unselectable photo${noneChecked ? ' none-checked' : ''} photo--group-of-${numOfPeople}`} src={file} alt=''/>
}
 
Photo.propTypes = {
    noneChecked: PropTypes.bool.isRequired,
    numOfPeople: PropTypes.number,
    person: PropTypes.shape({}).isRequired,
}

Photo.defaultProps = {
    numOfPeople: 4,
}

export default Photo;