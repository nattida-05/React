import { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';
const initialTasks = [
    { id: 1, text: 'Complete React Session 3', completed: true },
    { id: 2, text: 'Read React docs', completed: false },
    { id: 3, text: 'Read React documentation', completed: false },
];
let nextId = 4;
function App() {
    const [tasks, setTasks] = useState(initialTasks);
    const [filter, setFilter] = useState('all');
    function handleAddTask(text) {
        setTasks([...tasks, { id: nextId++, text, completed: false }]);
    }
    function handleToggle(id) {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    }
    function handleDelete(id) {
        setTasks(tasks.filter(t => t.id !== id));
    }
    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true; // "all"
    });
    // ... render JSX (filter buttons + TaskInput + filtered.map(TaskItem))
}