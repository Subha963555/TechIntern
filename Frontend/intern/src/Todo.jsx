import React, { useEffect, useState } from 'react';

const Todo = () => {
    const [todo, setTodo] = useState('');
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);

    // Load todos from localStorage on component mount
    useEffect(() => {
        const data = localStorage.getItem('todos');
        if (data) {
            setTodos(JSON.parse(data));
        }
    }, []);

    const saveTodo = () => {
        if (todo.trim() !== '' && task.trim() !== '') {
            const newTodo = { todo: todo, task: task };
            const updatedTodos = [...todos, newTodo];
            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            setTodo('');
            setTask('');
        }
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const updateTodo = (index) => {
        const newTodo = prompt('Enter new todo item', todos[index].todo);
        const newTask = prompt('Enter new task item', todos[index].task);
        if (newTodo !== null && newTask !== null) {
            const updatedTodos = [...todos];
            updatedTodos[index] = { todo: newTodo, task: newTask };
            setTodos(updatedTodos);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }
    };

    return (
        <>
            <input
                type='text'
                placeholder='Enter Todo Item...'
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
            />
            <input
                type='text'
                placeholder='Enter Task'
                onChange={(e) => setTask(e.target.value)}
                value={task}
            />
            <button onClick={saveTodo}>Save</button>
            {todos.map((ele, i) => (
                <div key={i}>
                    <button onClick={() => deleteTodo(i)}>Delete</button>
                    {ele.todo}: {ele.task}
                    <button onClick={() => updateTodo(i)}>Update</button>
                </div>
            ))}
        </>
    );
};

export default Todo;
