import React from 'react';
import PropTypes from 'prop-types';
import './LastCorrect.css'


const LastCorrect = ({lastCorrect}) => {
    const file = lastCorrect.src ? require(`../../images/${lastCorrect.src}`) : ''
    return (
        <div className="last-correct__container">
            {/* <h3 className="last-correct__header">Last Correct Match:</h3> */}
            <div className="last-correct__photo-container">
                {lastCorrect.src && 
                    <img className="item unselectable last-correct__photo" src={file} /> 
                }
            </div>
            { lastCorrect.src && 
                <div className="last-correct__name-container">
                    <span className="item word word__firstName">{ lastCorrect.firstName }</span>
                    <span className="item word word__lastName">{` ${lastCorrect.lastName}`}</span>
                </div>
            }
        </div>
    )
}
 
LastCorrect.propTypes = {
    lastCorrect: PropTypes.shape({
        src: PropTypes.string,
        firstName: PropTypes.string,
    })
}

LastCorrect.defaultProps = {
    lastCorrect: null
}

export default LastCorrect;