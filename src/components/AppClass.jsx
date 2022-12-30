import React, {Component} from 'react';

export default class AppClass extends  Component
{
    constructor(props) {
        super(props)
        this.state = {
            todos: [
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
            ]
        }
    }
    render() {
        return (
            <div className="todo-app-container">
                <header className="todo-app">
                    <h2>Todo App</h2>
                    <form>
                        <input
                            type="text"
                            className="todo-input"
                            placeholder="what do you need to do?"
                        />
                    </form>

                    <ul className="todo-list">
                        {this.state.todos.map((todo, index ) => (
                        <li className="todo-item-container">
                            <div className="todo-item">
                                <input type="checkbox"/>
                                <span className="todo-item-label">
                                  {todo.title}
                                </span>
                            </div>
                            <button className="x-button">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </li>))}
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
        )
    }
}