import React from 'react';
import PropTypes from 'prop-types';

/**
 * Check the props' types and check if this prop is required to have in our component
 *
 * It is an optional tool. It's just to check the props' types and some others information
 */
TaskFilters.propTypes = {
    tasksFiltered: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}

function TaskFilters (props) {
    return (
        <div>
            <button
                onClick={() => {
                    props.setFilter('all') // this is the props.filter 'all'
                    props.tasksFiltered('all') // this is the props.filter 'all'
            }}
                className={`button filter-button ${props.filter === 'all' 
                    ? 'filter-button-active' 
                    : ''
                }`}

            >
                All
            </button>
            <button
                onClick={() => {
                    props.setFilter('active') // this is the props.filter 'active'
                    props.tasksFiltered('active') // this is the props.filter 'active'
                }}
                className={`button filter-button ${props.filter === 'active' 
                    ? 'filter-button-active' 
                    : ''
                }`}

            >
                Active
            </button>
            <button
                onClick={() => {
                    props.setFilter('completed') // this is the props.filter 'completed'
                    props.tasksFiltered('completed') // this is the props.filter 'completed'
                }}
                className={`button filter-button ${props.filter === 'completed' 
                    ? 'filter-button-active' 
                    : ''
                }`}

            >
                Completed
            </button>
        </div>
    )
}

export default TaskFilters