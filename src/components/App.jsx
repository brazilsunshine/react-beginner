import React, {useState} from "react";
import '../App.css';

function App() {
  // think this as getters and setters in vuex
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Finish my homework',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'give sean a slap',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Brush teeth',
      isComplete: false,
      isEditing: false,
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
    { // this is to prevent the user from adding a whitespace as a task
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
    // filtre as tasks que nao forem iguais a id vindo da function
    setTasks([... tasks].filter(task => task.id !== id))
  }

  /**
   * Function to handle event when a user adds a task
   */
  function handleInput(event)
  {
    setTaskInput(event.target.value); // the event is what the user type on the input
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

    setTasks(updatedTasks)
  }

  /**
   * On double-click set isEditing to true and show the <input> tag
   */
  function maskAsEditing(id)
  {
    const updatedTasks = tasks.map(task => {
      if (task.id === id)
      {
        task.isEditing = true;
      }

      return task;
    })

    setTasks(updatedTasks)
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
  }



  /**
   *  JSX
   */
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
                <li
                    key={task.id}
                    className="task-item-container"
                >
                  <div className="task-item">
                    {/*react: everytime a method you're passing in has a parameter, make sure you pass it has a callback*/}
                    <input
                        type="checkbox"
                        onChange={() => completeTask(task.id)}
                        checked={task.isComplete ? true : false}
                    />

                    {/*{ !task.isEditing ? (span) : (input)}*/}
                    {/*If !isEditing is true I want to show the span, if it's false I want to show the input */}
                    { !task.isEditing ? (
                      <span
                          onDoubleClick={() => maskAsEditing(task.id)}
                          className={`task-item-label ${task.isComplete ? 'line-through' : ''}`}
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
        </header>
      </div>
  );
}

export default App;
