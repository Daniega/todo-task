import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
	const [input, setInput] = useState(props.edit ? props.edit.value : '');

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		props.onSubmit({
			id: Math.floor(Math.random() * 10000),
			text: input,
		});
		setInput('');
	};

	const handleChange = (event) => {
		setInput(event.target.value);
	};

	const editableForm = (text, action) => {
		if (action === 'Add') {
			return (
				<>
					<input className='todo-input' type='text' placeholder={text} value={input} name='text' onChange={handleChange} ref={inputRef} />
					<button className='todo-button'>{action}</button>
				</>
			);
		} else {
			return (
				<>
					<input className='todo-input edit' type='text' placeholder={text} value={input} name='text' onChange={handleChange} ref={inputRef} />
					<button className='todo-button edit'>{action}</button>
				</>
			);
		}
	};

	return (
		<form className='todo-form' onSubmit={handleSubmit}>
			{props.edit ? editableForm('Update your item', 'Update') : editableForm('Add a todo', 'Add')}
		</form>
	);
}

export default TodoForm;
