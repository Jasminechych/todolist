import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react';
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/todos.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  let countOfTodos = todos.length;
  const navigate = useNavigate();
  const {isAuthenticated, currentMember} = useAuth()

  const handleOnChange = (value) => setInputValue(value);

  const handleAddTodo = async () => {
    if (!inputValue.length) return;

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            title: data.title,
            isDone: data.isDone,
            id: data.id,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = async () => {
    if (!inputValue.length) return;

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            title: data.title,
            isDone: data.isDone,
            id: data.id,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isDone: !todo.isDone };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEdit };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({
        id,
        title,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, title, isEdit: false };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.log(error);
      }
    };
    getTodosAsync();
  }, []);

  return (
    <div>
      TodoPage
      <Header username={currentMember?.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleOnChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer countOfTodos={countOfTodos} />
    </div>
  );
};

export default TodoPage;
