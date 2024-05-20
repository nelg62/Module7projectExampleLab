import React, { useState, useContext, useReducer, useEffect } from "react";
import axios from "axios";
const reducer = (state, action) => {
  switch (action.type) {
    case "initTodos":
      return action.payload;
    case "addTodo":
      return [action.payload];

    case "updateTodo":
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );

    case "deleteTodo":
      console.log("state", state);
      console.log("...state", ...state);
      console.log("actionpayload", action.payload);
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
};
const TodoContext = React.createContext();
// Custom provider component for this context.
// Use it in App.jsx like <UserProvider>...</UserProvider>
export const TodoProvider = (props) => {
  // store the current user in state at the top level
  const [todos, todoDispatch] = useReducer(reducer, []);
  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((response) => {
      todoDispatch({ type: "initTodos", payload: response.data });
    });
  }, []);

  return (
    <TodoContext.Provider value={{ todos, todoDispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};
// 3. Use the context. This custom hook allows easy access
// of this particular context from any child component
export const useToDoContext = () => {
  return useContext(TodoContext);
};
