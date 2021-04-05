import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

import { getFromLocalStorage, saveToLocalStorage } from '../services';

function TodoList() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		const getTodos = getFromLocalStorage('todosData');
		if (getTodos !== null) {
			setTodos(getTodos.data);
		} else return;
	}, []);
	//add todo item
	const addTodo = (todo) => {
		if (!todo.text || /^\s*$/.test(todo.text)) return; //if text has many spaces or wrong input

		const newTodos = [todo, ...todos];
		setTodos(newTodos);
		saveToLocalStorage('todosData', newTodos);
	};
	//update todo item
	const updateTodo = (todoId, newValue) => {
		if (!newValue.text || /^\s*$/.test(newValue.text)) return; //if text has many spaces or wrong input
		setTodos((prev) => {
			const newArr = prev.map((item) => (item.id === todoId ? newValue : item));
			saveToLocalStorage('todosData', newArr);
			return newArr;
		});
	};
	//mark todo item as completed
	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		setTodos(updatedTodos);
		saveToLocalStorage('todosData', updatedTodos);
	};
	//mark all todo items as completed
	const completeAllTodos = () => {
		let updatedTodos = todos.map((todo) => {
			todo.isComplete = true;
			return todo;
		});
		setTodos(updatedTodos);
		saveToLocalStorage('todosData', updatedTodos);
	};
	//delete a todo item
	const removeTodo = (id) => {
		let removedTodoArr = todos.filter((todo) => todo.id !== id);
		setTodos(removedTodoArr);
		saveToLocalStorage('todosData', removedTodoArr);
	};
	return (
		<div>
			<h1>What's the plan for today?</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
			{todos.length > 0 && (
				<div className='todo-row' onClick={completeAllTodos}>
					<h3>Check everything, I need a beer</h3>
				</div>
			)}
		</div>
	);
}

export default TodoList;
