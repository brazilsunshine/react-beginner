import React, {useContext} from 'react';
import {TasksContext} from "../context/TasksContext";


function TaskClearCompletedButton ()
{
    const { tasks, setTasks } = useContext(TasksContext); // receiving the value from TasksContext

    /**
     * Clear all the tasks that are completed
     */
    function clearCompleted ()
    {
        // 1. setTasks array will become the new copy of tasks array; so the original tasks array won't be affected
        // 2. The task that is not completed will pass the test inside the parentheses
        setTasks([...tasks].filter(task => !task.isComplete))
    }
    return (
        <button
            onClick={clearCompleted}
            className="button"
        >
            Clear completed
        </button>
    )
}

export default TaskClearCompletedButton