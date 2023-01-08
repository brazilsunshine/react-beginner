import React from 'react';
import PropTypes from 'prop-types';

/**
 * Check the props' types and check if this prop is required to have in our component
 *
 * It is an optional tool. It's just to check the props' types and some others information
 */
TaskClearCompletedButton.propTypes = {
    clearCompleted: PropTypes.func.isRequired,
}

function TaskClearCompletedButton (props) {
    return (
        <button
            onClick={props.clearCompleted}
            className="button"
        >
            Clear completed
        </button>
    )
}

export default TaskClearCompletedButton