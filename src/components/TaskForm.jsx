import React, {useContext, useState} from 'react';
import {TasksContext} from "../context/TasksContext";


function TaskForm () { // receiving the addTask function as a prop from the parent component
    /**
     * Think this as getters and setters in vuex
     *
     * Where it's going to 'get' the taskInput and the 'set' setTaskInput
     */
    const [taskInput, setTaskInput] = useState('');

    const { tasks, setTasks, idForTask, setIdForTask } = useContext(TasksContext); // receiving the value from TasksContext


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
    function addTask (event)
    {
        event.preventDefault(); // this will prevent the browser from reloading when a task is added

        if (taskInput.trim().length === 0) // if the whitespace trim() is equal to zero we don't wanna to anything.
        { // this is to prevent the user from adding a whitespace as a task
            return;
        }
        console.log({event});

        setTasks([...tasks, { // creating a new array with spread syntax and add values to the new array
            id: idForTask,
            title: taskInput,
            isComplete: false,
        }]);

        setIdForTask(prevIdForTask => prevIdForTask + 1); // setIdForTask(idForTask + 1);
        // in react this is how we assert value to something
        // setTasks will now become whatever is inside the parentheses

        setTaskInput('');
    }

    return (
        <form onSubmit={addTask}>
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