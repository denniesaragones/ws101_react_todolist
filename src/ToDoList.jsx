import React, { useState } from 'react';
import './ToDoList.css';


function ToDoList() {
    const [tasks, setTasks] = useState([{ text: "Clean The House", completed: false }, { text: "Take a Profit", completed: false }, { text: "Push Up", completed: false }, { text: "Sleep", completed: false }, { text: "Take a Shower", completed: false }, { text: "Get a Girl", completed: false }]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function editTask(index) {
        setEditIndex(index);
        setNewTask(tasks[index].text);
    }

    function updateTask() {
        if (editIndex !== null && newTask.trim()) {
            const updatedTasks = tasks.map((task, index) =>
                index === editIndex ? { ...task, text: newTask } : task
            );
            setTasks(updatedTasks);
            setNewTask("");
            setEditIndex(null);
        }
    }

    function toggleCompletion(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    const completedCount = tasks.filter(task => task.completed).length;

    
    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter Any Task..."
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className='add-button'
                    onClick={editIndex !== null ? updateTask : addTask}>
                    {editIndex !== null ? 'Update' : 'Add'}
                </button>
            </div>

            <p>{completedCount}/{tasks.length} completed</p>

            <ol>
                {tasks.map((task, index) => (
                    <li key={index} className="task-item">
                        <div className="task-grid">
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleCompletion(index)}
                            />
                            <span className="text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.text}
                            </span>
                            <div className="button-container">
                                <button
                                    className="edit-button"
                                    onClick={() => editTask(index)}>
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteTask(index)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
