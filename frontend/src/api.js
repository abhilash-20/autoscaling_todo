export const API_BASE_URL = "http://autoscale-todo-alb-1491623542.ap-southeast-2.elb.amazonaws.com";

export const api = {
  getTodos: async () => {
    const res = await fetch(`${API_BASE_URL}/todos`);
    return res.json();
  },

  addTodo: async (title) => {
    return fetch(`${API_BASE_URL}/todos?title=${encodeURIComponent(title)}`, {
      method: "POST",
    });
  },

  updateTodo: async (todo) => {
    return fetch(`${API_BASE_URL}/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
  },

  deleteTodo: async (id) => {
    return fetch(`${API_BASE_URL}/todos/${id}`, { method: "DELETE" });
  }
};
