import React, {useContext} from 'react';
import TaskItemsRemaining from './TaskItemsRemaining';
import TaskClearCompletedButton from './TaskClearCompletedButton';
import CheckAll from "./CheckAll";
import TaskFilters from "./TaskFilters";
import useToggle from "../hooks/useToggle";
import {TasksContext} from "../context/TasksContext";

function TaskList() // receiving all the props coming in from the parent component
{
    const { tasks, setTasks, tasksFiltered } = useContext(TasksContext);
    const [isButtonFeaturesOneVisible, setIsButtonFeaturesOneVisible] = useToggle(); // useToggle is a custom hook that we created
    const [isButtonFeaturesTwoVisible, setIsButtonFeaturesTwoVisible] = useToggle(); // useToggle is a custom hook that we created

    /**
     * Delete a task from my task list
     */
    function deleteTask(id)
    {
        // 1. make new array of tasks
        // 2. filter method will receive any task
        // 3. the task.id that doesn't match the id coming from the function, will remain on the list
        // filtre as tasks que nao forem iguais a id vindo da function
        setTasks([... tasks].filter(task => task.id !== id))
    }

    /**
     * Complete task from todo list
     */
    function completeTask(id)
    {
        const updatedTasks = tasks.map(task => {
            if (task.id === id)
            {
                task.isComplete = !task.isComplete
            }

            return task;
        })

        setTasks(updatedTasks);
        // in react this is how we assert value to something
        // setTasks will now become the variable updatedTasks
    }

    /**
     * On double-click on the task set isEditing to true and show the <input> tag
     */
    function markAsEditing(id)
    {
        const updatedTasks = tasks.map(task => {
            if (task.id === id)
            {
                task.isEditing = true;
            }

            return task;
        })

        setTasks(updatedTasks);
        // in react this is how we assert value to something
        // setTasks will now become the variable updatedTasks
    }

    /**
     * Update task and set isEditing to false and show the <span> tag
     */
    function updateTask(event, id)
    {
        const updatedTasks = tasks.map(task => {
            if (task.id === id)
            {
                if (event.target.value.trim().length === 0) // if the whitespace trim() is equal to zero then just return the old task.
                { // this is to prevent the user from adding a whitespace as a task
                    task.isEditing = false;
                    return task;
                }

                task.title = event.target.value

                task.isEditing = false;
            }

            return task;
        })

        setTasks(updatedTasks)
        // in react this is how we assert value to something
        // setTasks will now become the variable updatedTasks
    }

    /**
     * If escape key is pressed cancel the editing task and set isEditing to false
     */
    function cancelEditingTask(id)
    {
        const updatedTasks = tasks.map(task => {
            if (task.id === id)
            {
                task.isEditing = false;
            }

            return task;
        })

        setTasks(updatedTasks)
        // in react this is how we assert value to something
        // setTasks will now become the variable updatedTasks
    }

    return (
        <div>
            <ul className="task-list">
                {tasksFiltered().map((task, index ) => (
                    <li
                        key={task.id}
                        className="task-item-container"
                    >
                        <div className="task-item">
                            {/*react: everytime a method you're passing in has a parameter, make sure you pass it as a callback*/}
                            <input
                                type="checkbox"
                                onChange={() => completeTask(task.id)}
                                checked={task.isComplete ? true : false}
                            />

                            {/*{ !task.isEditing ? (span) : (input)}*/}
                            {/*If !isEditing is true I want to show the span, if it's false I want to show the input */}
                            { !task.isEditing ? (
                                <span
                                    onDoubleClick={() => markAsEditing(task.id)}
                                    className={`task-item-label ${task.isComplete 
                                        ? 'line-through' 
                                        : ''
                                    }`}
                                >
                                {task.title}
                            </span>
                            ) : (
                                <input
                                    type="text"
                                    onBlur={(event) => updateTask(event, task.id)}
                                    onKeyDown={event => {
                                        if (event.key === 'Enter')
                                        {
                                            updateTask(event, task.id);
                                        } else if (event.key === 'Escape')
                                        {
                                            cancelEditingTask(task.id);
                                        }
                                    }}
                                    className="task-item-input"
                                    defaultValue={task.title}
                                    autoFocus
                                />
                            )}
                            {/* onBlur: Every time you get out of focus from the input field, the event will trigger. */}
                        </div>

                        {/*react: everytime a method you're passing in has a parameter, make sure you pass it has a callback*/}
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="x-button"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="toggles-container">
                <button
                    onClick={setIsButtonFeaturesOneVisible}
                    className="button"
                >
                    Features One Toggle
                </button>

                <button
                    onClick={setIsButtonFeaturesTwoVisible}
                    className="button"
                >
                    Features Two Toggle
                </button>
            </div>

            {isButtonFeaturesOneVisible && (
                <div className="check-all-container">
                    <div>
                        <CheckAll />
                    </div>
                    <div>
                        <TaskItemsRemaining />
                    </div>
                </div>
            )}

            {isButtonFeaturesTwoVisible && (
                <div className="other-buttons-container">
                    <div>
                        <TaskFilters
                            tasksFiltered={tasksFiltered}
                        />
                    </div>
                    <div>
                        <TaskClearCompletedButton />
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskList;