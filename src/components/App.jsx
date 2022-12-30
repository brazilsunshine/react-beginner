import React, {useState} from "react";
import '../App.css';

function App() {
  // think this as getters and setters in vuex
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Finish my homework',
      isComplete: false,
    },
    {
      id: 2,
      title: 'give sean a slap',
      isComplete: false,
    },
    {
      id: 3,
      title: 'Brush teeth',
      isComplete: false,
    },
  ]);

  // think this as getters and setters in vuex
  const [taskInput, setTaskInput] = useState('');
  const [idForTask, setIdForTask] = useState(4);

  /**
   * Add a task to my task list
   */
  function addTask(event)
  {
    event.preventDefault(); // this will prevent the browser from reload a task is added

    if (taskInput.trim().length === 0) // if the whitespace trim() is equal to zero we don't wanna to anything.
    { // this is to prevent from adding a whitespace as a task
      return;
    }

    setTasks([...tasks, { // creating a new array with spread syntax and add values to the new array
      id: idForTask,
      title: taskInput,
      isComplete: false,
    }]);

    setTaskInput('');
    setIdForTask(prevIdForTask => prevIdForTask + 1); // setIdForTask(idForTask + 1);
  }

  /**
   * Delete a task from my task list
   */
  function deleteTask(id)
  {
    // 1. make new array of tasks
    // 2. filter method will receive any task
    // 3. the task.id that doesn't match the id coming from the function, will remain on the list
    setTasks([... tasks].filter(task => task.id !== id))
  }

  /**
   * Function to hande event when a user adds a task
   */
  function handleInput(event)
  {
    setTaskInput(event.target.value); // the event is what the user type on the input
  }

  return (
      <div className="task-app-container">
        <header className="task-app">
          <h2>Task App</h2>
          <form onSubmit={addTask}>
            <input
                type="text"
                value={taskInput}
                onChange={handleInput}
                className="task-input"
                placeholder="what do you need to do?"
            />
          </form>

          <ul className="task-list">
            {tasks.map((task, index ) => (
                <li key={task.id} className="task-item-container">
                  <div className="task-item">
                    <input type="checkbox"/>
                    <span className="task-item-label">
                        {task.title}
                      </span>
                  </div>
                  {/*react: everytime a method you're passing in has a parameter, make sure you pass it has a callback*/}
                  <button onClick={() => deleteTask(task.id)} className="x-button">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </li>
            ))}
          </ul>
          <div className="check-all-container">
            <div>
              <div className="button">Check All</div>
            </div>

            <span>3 items remaining</span>
          </div>

          <div className="other-buttons-container">
            <div>
              <button className="button filter-button filter-button-active">
                All
              </button>
              <button className="button filter-button">Active</button>
              <button className="button filter-button">Completed</button>
            </div>
            <div>
              <button className="button">Clear completed</button>
            </div>
          </div>
        </header>
      </div>
  );
}

export default App;
