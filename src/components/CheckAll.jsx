import React, {useContext} from 'react';
import {TasksContext} from "../context/TasksContext";


function CheckAll ()
{
    const { tasks, setTasks } = useContext(TasksContext); // receiving the value from TasksContext


    /**
     * Check all tasks
     */
    function checkAllTasks (id)
    {
        const updatedTasks = tasks.map(task =>
        {
            task.isComplete = true;

            return task;
        })

        setTasks(updatedTasks);
        // in react this is how we assert value to something
        // setTasks will now become the variable updatedTasks
    }

    return (
        <div
            onClick={checkAllTasks}
            className="button"
        >
            Check All
        </div>
    )
}

export default CheckAll