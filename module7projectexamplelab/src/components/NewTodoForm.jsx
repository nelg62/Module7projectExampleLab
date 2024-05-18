import { useState } from "react";
import axios from "axios";
import { useToDoContext } from "../context/TodoContext";
function NewTodoForm({ addTodo }) {
  const { todos, todoDispatch } = useToDoContext();
  const [todo, setTodo] = useState({ title: "zcvhjzclvhzklcxvhjzxcvs" });

  const sumbit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/todos", todo);
    console.log("responseTodo", response);
    todoDispatch({ type: "addTodo", payload: response.data });
    setTodo({ title: "" });
  };

  const updateTodo = (newTodo) => {
    const updateTodo = { ...todo, ...newTodo };
    setTodo(updateTodo);
  };
  return (
    <>
      <h2>Todo form:</h2>
      <div>
        <form id="todo-form" onSubmit={sumbit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={todo.title}
            // value={todo.title}
            onChange={(e) => updateTodo({ title: e.target.value })}
          />
          {/* <label htmlFor="completed">Completed:</label>
          <input type="checkbox" id="completed" name="completed" /> */}
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}
export default NewTodoForm;
