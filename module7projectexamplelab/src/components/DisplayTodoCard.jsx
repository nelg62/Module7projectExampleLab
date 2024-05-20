import { useState } from "react";
import axios from "axios";
import UpdateTodoCard from "./UpdateTodoCard";
import { useToDoContext } from "../context/TodoContext";
export default function DisplayTodoCard({ todo, updateTodo, setEditView }) {
  const { todoDispatch } = useToDoContext();
  const onCompletedChange = (todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo(updatedTodo);
  };

  const deleteTodo = async (id) => {
    try {
      console.log(id);
      const response = await axios.delete(`http://localhost:3000/todos/${id}`);
      if (response.status === 200) {
        todoDispatch({ type: "deleteTodo", payload: id });
      }
    } catch (error) {
      console.error("Error deleting the Todo", error);
    }
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            defaultChecked={todo.completed}
            onChange={() => onCompletedChange(todo)}
          />
          <h5
            className={`title ${
              todo.completed ? "text-decoration-line-through" : ""
            }`}
          >
            {todo.title}
          </h5>
        </div>
        <a
          href="#"
          className="btn btn-danger delete"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </a>
        <a href="#" className="btn btn-primary edit" onClick={setEditView}>
          Edit
        </a>
      </div>
    </div>
  );
}
