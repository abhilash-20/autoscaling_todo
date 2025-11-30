import { useState } from "react";
import { Edit2, Save, Trash2, X, Check } from "lucide-react";

export function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const startEdit = () => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setTitle(todo.title);
    setDescription(todo.description || "");
  };

  const saveEdit = () => {
    if (!title.trim()) return;
    onEdit(todo.id, title.trim(), description.trim());
    setIsEditing(false);
  };

  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-center gap-3 p-4 rounded-xl border ${
        todo.completed ? "bg-gray-800/30 border-gray-700" : "bg-gray-900/40 border-gray-800"
      }`}
    >
      <div className="flex items-start md:items-center gap-3 w-full">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`flex-shrink-0 grid place-items-center w-10 h-10 rounded-lg ${
            todo.completed ? "bg-green-600/80" : "bg-white/5 hover:bg-white/10"
          } transition`}
        >
          {todo.completed ? (
            <Check className="w-5 h-5 text-white" />
          ) : (
            <div className="w-4 h-4 rounded-sm border border-gray-500/50" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-800/70 text-white px-3 py-2 rounded-md outline-none border border-gray-700 focus:border-gray-600"
                placeholder="Task title"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-gray-800/70 text-gray-200 px-3 py-2 rounded-md outline-none border border-gray-700 focus:border-gray-600 resize-y"
                placeholder="Description (optional)"
              />
            </div>
          ) : (
            <>
              <div
                className={`text-lg font-medium ${
                  todo.completed ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {todo.title}
              </div>
              {todo.description && (
                <div className="text-sm text-gray-400 mt-1 truncate">{todo.description}</div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={saveEdit}
              className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={cancelEdit}
              className="px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={startEdit}
              className="px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-200"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
