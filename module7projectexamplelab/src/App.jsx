import { useState } from "react";
import { BasicNav, NewTodoForm, TodoItem } from "./components";
import { Row } from "react-bootstrap";
import { useToDoContext } from "./context/TodoContext";

function App() {
  const { todos } = useToDoContext();

  return (
    <>
      <BasicNav></BasicNav>
      <NewTodoForm></NewTodoForm>
      <h2>todo items</h2>
      <Row>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            // updateTodo={updateTodo}
            // deleteTodo={deleteTodo}
          ></TodoItem>
        ))}
      </Row>
    </>
  );
}

export default App;
