import React, {useEffect, useMemo, useRef} from "react";
import '../App.css';
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import NoTasks from './NoTasks';
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
    // think this as getters and setters in vuex
    // const [name, setName] = useState('');
    const [name, setName] = useLocalStorage('name', '')

    const nameInputElement = useRef(null);
     const [tasks, setTasks] = useLocalStorage('tasks', []);

    // const [tasks, setTasks] = useState([
    //     {
    //         id: 1,
    //         title: 'Finish my homework',
    //         isComplete: false,
    //         isEditing: false,
    //     },
    //     {
    //         id: 2,
    //         title: 'give sean a kiss',
    //         isComplete: true,
    //         isEditing: false,
    //     },
    //     {
    //         id: 3,
    //         title: 'Brush teeth',
    //         isComplete: false,
    //         isEditing: false,
    //     },
    // ]);

    // think this as getters and setters in vuex
    // const [idForTask, setIdForTask] = useState(4);
    const [idForTask, setIdForTask] = useLocalStorage('tasksId', 0);

    /**
     * Add a task to my task list
     */
    function addTask(task)
    {
        setTasks([...tasks, { // creating a new array with spread syntax and add values to the new array
            id: idForTask,
            title: task,
            isComplete: false,
        }]);

        setIdForTask(prevIdForTask => prevIdForTask + 1); // setIdForTask(idForTask + 1);
        // in react this is how we assert value to something
        // setTasks will now become whatever is inside the parentheses
    }

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
     * On double-click set isEditing to true and show the <input> tag
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

    /**
     * Clear all the tasks that are completed
     */
    function clearCompleted ()
    {
        // 1. setTasks array will become the new copy of tasks array; so the original tasks array won't be affected
        // 2. The task that is not completed will pass the test inside the parentheses
        setTasks([... tasks].filter(task => !task.isComplete))
    }

    /**
     * Complete all tasks
     */
    function completeAllTasks (id)
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

    /**
     * Filter tasks
     */
    function tasksFiltered (filter) {
        if (filter === 'all')
        {
            return tasks;
        }
        else if (filter === 'active')
        {
            return tasks.filter(task => !task.isComplete);
        }
        else if (filter === 'completed')
        {
            return tasks.filter(task => task.isComplete);
        }
    }

    /**
     * useEffect tells React that your component needs to do something when the component is mounted.
     *
     * The empty array specifies that I just want the useEffect to be hit when the component is mounted
     *
     * Retrieve 'name' value from localStorage when this component is mounted
     */
    useEffect(() => { // This is just focusing on the first input when the component is mounted
        nameInputElement.current.focus() // so the user may get triggered to put their name

        // nullish coalescing (??) return empty string if its left side is null or undefined
        // setName(JSON.parse(localStorage.getItem('name')) ?? '');
        // The JSON.parse() parses a JSON string, and outputs the JavaScript value or object described by the string.
    }, []);

    /**
     * Set the name to become the input's value
     *
     * Save the name in the localStorage
     */
    function handleNameInput (event)
    {
        setName(event.target.value);

        // localStorage.setItem('name', JSON.stringify(event.target.value))
        // JSON.stringify() takes a JavaScript object and transforms it into a JSON string.
        // localStorage doesn't store the object data into the localStorage, it needs Strings,
    }



    /**
     *  JSX
     */
    return (
        <div className="task-app-container">
            <header className="task-app">
                <div className="name-container">
                    <h2>What is your name?</h2>
                    <form action="">
                        <input
                            type="text"
                            ref={nameInputElement}
                            className="task-input"
                            placeholder="What is your name?"
                            value={name}
                            onChange={handleNameInput}
                        />
                    </form>
                    {name &&
                        <p className="name-label">
                        Hello, {name}
                        </p>
                    }
                </div>
                <h2>Task App</h2>
                {/*Here I am passing the addTask function as a prop to the child component*/}
                <TaskForm addTask={addTask}/>

                {/*passing these information as props to the TaskList child component*/}
                { tasks.length > 0
                    ? (<TaskList
                        tasks={tasks}
                        completeTask={completeTask}
                        markAsEditing={markAsEditing}
                        updateTask={updateTask}
                        cancelEditingTask={cancelEditingTask}
                        deleteTask={deleteTask}
                        remainingTasks={remainingTasks}
                        clearCompleted={clearCompleted}
                        completeAllTasks={completeAllTasks}
                        tasksFiltered={tasksFiltered}
                    />)
                    : (<NoTasks />)
                }
          </header>
        </div>
    );
}

export default App;
