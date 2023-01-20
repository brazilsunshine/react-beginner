import React, {useContext, useMemo} from 'react';
import {TasksContext} from "../context/TasksContext";

function TaskItemsRemaining () // accepting remainingTasks as a prop from the parent component <TaskList />
{
    const { tasks } = useContext(TasksContext); // receiving the value from TasksContext

    /**
     * The task that is not completed will pass the test inside the parentheses
     *
     * Give me the length of these tasks that didn't pass the test inside the parentheses
     */
    function remainingTasksCalculation ()
    {
        return tasks.filter(task => !task.isComplete).length;
    }

    /**
     * useMemo Hook returns a memoized value
     *
     * Think of memoization as caching a value so that it does not need to be recalculated everytime
     * It stores the result so that it can be retrieved without repeating the calculation
     */
    const remainingTasks = useMemo(remainingTasksCalculation, [tasks]);

    return (
        <span>
            {remainingTasks} Items remaining
        </span>
    )
}

export default TaskItemsRemaining