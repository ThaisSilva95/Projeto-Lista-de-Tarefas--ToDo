import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';
import Header from './components/Header/header';
import Pencil from './assets/pencil.svg';
import Trash from './assets/trash.svg';
import EditModal from './components/Editar/editar';
import DeleteModal from './components/Excluir/excluir';
function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteText, setDeleteText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, isCompleted: false }]);
    setNewTodo("");
  };

  const confirmDelete = () => {
    setTodos(todos.filter(todo => todo.id !== deleteId));
    setIsDeleteModalOpen(false);
    setDeleteId(null);
    setDeleteText("");
  };

  const openDeleteModal = (id, text) => {
    setDeleteId(id);
    setDeleteText(text);
    setIsDeleteModalOpen(true);
  };

  const toggleTaskCompletion = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const openEditModal = (id, text) => {
    setEditingId(id);
    setEditingText(text);
    setIsEditModalOpen(true);
  };

  const confirmEdit = () => {
    setTodos(
      todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText("");
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className='container'>
        <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
        <div className='text-to-dos'>
          <h2>Tarefas</h2>
          <h2 className="status">Status</h2>
          <h2>Opções</h2>
        </div>
        <div className='todo-list'>
          {todos.map((todo) => (
            <div className='todo' key={todo.id}>
              <div className='content'>
                <p>{todo.text}</p>
              </div>
              <div className='box'>
                <input
                  type='checkbox'
                  checked={todo.isCompleted}
                  onChange={() => toggleTaskCompletion(todo.id)}
                  
                />
              </div>
              <div className='icons'>
                <button className='icon-1' onClick={() => openEditModal(todo.id, todo.text)}>
                  <img src={Pencil} alt='Lápis' />
                </button>
                <button className='icon-2' onClick={() => openDeleteModal(todo.id, todo.text)}>
                  <img src={Trash} alt='Lixeira' />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='new-todo'>
          <input
            type='text'
            placeholder='Nova Tarefa...'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodo}>+</button>
        </div>
      </div>
      {isEditModalOpen && (
        <EditModal 
          text={editingText} 
          setText={setEditingText} 
          onCancel={() => setIsEditModalOpen(false)} 
          onConfirm={confirmEdit} 
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal 
          taskText={deleteText} 
          onCancel={() => setIsDeleteModalOpen(false)} 
          onConfirm={confirmDelete} 
        />
      )}
    </>
  );
}

export default App;
