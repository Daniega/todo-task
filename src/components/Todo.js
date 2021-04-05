import React, { useState } from 'react';
//components
import TodoForm from './TodoForm';
//libraries
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
	const [edit, setEdit] = useState({ id: null, value: '' });

	const submitUpdate = (value) => {
		updateTodo(edit.id, value);
		setEdit({
			id: null,
			value: '',
		});
	};

	if (edit.id) {
		return <TodoForm edit={edit} onSubmit={submitUpdate} />;
	}

	return todos.map((todo, index) => (
		<div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
			<div className='todo-text' key={todo.id} onClick={() => completeTodo(todo.id)}>
				{todo.text}
			</div>
			<div className='icons'>
				<AiFillDelete onClick={() => removeTodo(todo.id)} className='delete-icon' />
				<AiFillEdit onClick={() => setEdit({ id: todo.id, value: todo.text })} className='edit-icon' />
			</div>
		</div>
	));
}

export default Todo;
