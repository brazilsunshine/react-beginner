import React from 'react';
import PropTypes from 'prop-types';

/**
 * Check the props' types and check if this prop is required to have in our component
 *
 * It is an optional tool. It's just to check the props' types and some others information
 */
TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    completeTask: PropTypes.func.isRequired,
    markAsEditing: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    cancelEditingTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
}

function TaskList(props) {  // receiving all the props coming in from the parent component
    return (
        <div>
            <ul className="task-list">
                {props.tasks.map((task, index ) => (
                    <li
                        key={task.id}
                        className="task-item-container"
                    >
                        <div className="task-item">
                            {/*react: everytime a method you're passing in has a parameter, make sure you pass it has a callback*/}
                            <input
                                type="checkbox"
                                onChange={() => props.completeTask(task.id)}
                                checked={task.isComplete ? true : false}
                            />

                            {/*{ !task.isEditing ? (span) : (input)}*/}
                            {/*If !isEditing is true I want to show the span, if it's false I want to show the input */}
                            { !task.isEditing ? (
                                <span
                                    onDoubleClick={() => props.markAsEditing(task.id)}
                                    className={`task-item-label ${task.isComplete ? 'line-through' : ''}`}
                                >
                                {task.title}
                            </span>
                            ) : (
                                <input
                                    type="text"
                                    onBlur={(event) => props.updateTask(event, task.id)}
                                    onKeyDown={event => {
                                        if (event.key === 'Enter')
                                        {
                                            props.updateTask(event, task.id);
                                        } else if (event.key === 'Escape')
                                        {
                                            props.cancelEditingTask(task.id);
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
                            onClick={() => props.deleteTask(task.id)}
                            className="x-button"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </li>
                ))}
            </ul>
            <div className="check-all-container">
                <div>
                    <div className="button">
                        Check All
                    </div>
                </div>
                <span>
                    3 items remaining
                  </span>
            </div>
            <div className="other-buttons-container">
                <div>
                    <button className="button filter-button filter-button-active">
                        All
                    </button>
                    <button className="button filter-button">
                        Active
                    </button>
                    <button className="button filter-button">
                        Completed
                    </button>
                </div>
                <div>
                    <button className="button">
                        Clear completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskList;