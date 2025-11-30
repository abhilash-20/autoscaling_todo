import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export function AddTaskModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus();

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const submit = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-lg mx-4 text-white z-10">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold">Add New Task</h3>

          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mt-4">
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full bg-gray-900/60 border border-gray-700 rounded-md px-3 py-2 text-white outline-none"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Description (optional)"
            className="w-full bg-gray-900/60 border border-gray-700 rounded-md px-3 py-2 text-gray-200 resize-y outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 text-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
