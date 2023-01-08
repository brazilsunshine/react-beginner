import React from 'react';
import PropTypes from 'prop-types';

/**
 * Check the props' types and check if this prop is required to have in our component
 *
 * It is an optional tool. It's just to check the props' types and some others information
 */
CheckAll.propTypes = {
    completeAllTasks: PropTypes.func.isRequired,
}

function CheckAll (props) {
    return (
        <div
            onClick={props.completeAllTasks}
            className="button"
        >
            Check All
        </div>
    )
}

export default CheckAll