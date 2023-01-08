import React from 'react';
import PropTypes from 'prop-types';

/**
 * Check the props' types and check if this prop is required to have in our component
 *
 * It is an optional tool. It's just to check the props' types and some others information
 */
TaskItemsRemaining.propTypes = {
    remainingTasks: PropTypes.func.isRequired,
}

function TaskItemsRemaining (props) { // accepting remainingTasks as a prop from the parent component <TaskList />
    return (
        <span>
            {props.remainingTasks()} Items remaining
        </span>
    )
}

export default TaskItemsRemaining