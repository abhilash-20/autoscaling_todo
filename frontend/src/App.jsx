import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { AddTaskModal } from './components/AddTaskModal';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddTodo = (title, description) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setIsAddModalOpen(false);
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleEditTodo = (id, title, description) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, title, description } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-white mb-8 text-3xl font-semibold">My Tasks</h1>

        {todos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400">
              No tasks yet. Click the + button to add your first task!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}

        {/* Floating Add Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Modal */}
        {isAddModalOpen && (
          <AddTaskModal
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddTodo}
          />
        )}
      </div>
    </div>
  );
}
