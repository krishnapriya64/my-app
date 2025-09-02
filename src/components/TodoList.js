/**
 * TodoList component for managing a list of tasks.
 * Allows adding, toggling completion, and deleting tasks.
 */

import React, { useState } from "react";

function TodoList() {
  // State for the current task input
  const [task, setTask] = useState("");
  // State for the list of tasks
  const [tasks, setTasks] = useState([]);

  // Function to add a new task to the list
  const addTask = () => {
    if (task.trim() === "") return; // Prevent adding empty tasks
    setTasks([...tasks, { text: task, completed: false }]);
    setTask(""); // Clear input after adding
  };

  // Function to toggle the completion status of a task
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  // Function to delete a task from the list
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Input field for entering new tasks */}
      <input
        type="text"
        value={task}
        placeholder="Enter task"
        onChange={(e) => setTask(e.target.value)}
      />
      {/* Button to add the task */}
      <button onClick={addTask}>Add</button>

      {/* Unordered list to display tasks */}
      <ul>
        {tasks.map((t, i) => (
          <li key={i} className={t.completed ? "completed" : ""}>
            {t.text}
            {/* Button to toggle task completion */}
            <button onClick={() => toggleTask(i)}>✔</button>
            {/* Button to delete the task */}
            <button onClick={() => deleteTask(i)} className="delete-btn">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
