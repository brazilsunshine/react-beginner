import React, {useState} from 'react';
import PropTypes from 'prop-types';

/**
 * Check the props' types and check if this prop is required to have in our component
 *
 * It is an optional tool. It's just to check the props' types and some others information
 */
TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
}

function TaskForm (props) { // receiving the addTask function as a prop from the parent component
    /**
     * Think this as getters and setters in vuex
     *
     * Where it's going to 'get' the taskInput and the 'set' setTaskInput
     */
    const [taskInput, setTaskInput] = useState('');

    /**
     * Function to handle event when a user adds a task
     */
    function handleInput(event)
    {
        setTaskInput(event.target.value); // the event is what the user type on the input
    }


    /**
     * A user has added a new task
     */
    function handleSubmit (event)
    {
        event.preventDefault(); // this will prevent the browser from reloading when a task is added

        if (taskInput.trim().length === 0) // if the whitespace trim() is equal to zero we don't wanna to anything.
        { // this is to prevent the user from adding a whitespace as a task
            return;
        }
        console.log({event});

        props.addTask(taskInput); // accessing the addTask function from the props to retrieve whatever the user types in on the input

        setTaskInput('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskInput}
                onChange={handleInput}
                className="task-input"
                placeholder="what do you need to do?"
            />
        </form>
    )
}

export default TaskForm;