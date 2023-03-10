import React, {useEffect, useRef, useState} from "react";
import '../App.css';
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import NoTasks from './NoTasks';
import useLocalStorage from "../hooks/useLocalStorage";
import {TasksContext} from "../context/TasksContext";
import {CSSTransition, SwitchTransition} from "react-transition-group";

function App() {
    // think this as getters and setters in vuex
    const [name, setName] = useLocalStorage('name', '')

    const nameInputElement = useRef(null);
    const [tasks, setTasks] = useLocalStorage('tasks', []);

    // think this as getters and setters in vuex
    const [idForTask, setIdForTask] = useLocalStorage('tasksId', 0);

    const [filter, setFilter] = useState('all');

    /**
     * Filter tasks
     */
    function tasksFiltered () {
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
        // context.provider will provide the values tasks, setTasks, idForTask... globally for the children elements
        <TasksContext.Provider
            value={{
                tasks,
                setTasks,
                idForTask,
                setIdForTask,
                tasksFiltered,
                filter,
                setFilter
            }}
        >
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

                    <CSSTransition
                        in={name.length > 0}
                        timeout={300}
                        classNames="slide-vertical"
                        unmountOnExit
                    >
                        <p className="name-label">
                            Hello, {name}
                        </p>
                    </CSSTransition>

                </div>
                <h2>Task App</h2>
                <TaskForm />

                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={tasks.length > 0}
                        timeout={300}
                        classNames="slide-vertical"
                        unmountOnExit
                    >
                        { tasks.length > 0 ? <TaskList/> : <NoTasks />}
                    </CSSTransition>
                </SwitchTransition>

                {/* 'in' is the condition; so if tasks.length > 0 is true then do what's inside the CSSTransition tag */}
                {/*<CSSTransition*/}
                {/*    in={tasks.length > 0}*/}
                {/*    timeout={300}*/}
                {/*    classNames="slide-vertical"*/}
                {/*    unmountOnExit*/}
                {/*>*/}
                {/*    <TaskList />*/}
                {/*</CSSTransition>*/}

                {/*/!* 'in' is the condition; so if tasks.length === 0 is true then do what's inside the CSSTransition tag *!/*/}
                {/*<CSSTransition*/}
                {/*    in={tasks.length === 0}*/}
                {/*    timeout={300}*/}
                {/*    classNames="slide-vertical"*/}
                {/*    unmountOnExit*/}
                {/*>*/}
                {/*    <NoTasks />*/}
                {/*</CSSTransition>*/}
          </header>
        </TasksContext.Provider>
    );
}

export default App;
