import React, { useState, useContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      let index = 1;
      if (state.length > 0) {
        index = Math.max(...state.map((todo) => todo.id)) + 1;
      }
      return [...state, { ...action.payload, id: index }];

    case "updateTodo":
      const tempTodo = action.payload;
      const foundIndex = [...state].indexOf((todo) => todo.id === tempTodo.id);
      const copyState = [...state];
      copyState.splice(foundIndex, 1, tempTodo);
      return copyState;

    case "deleteTodo":
      const deleteTodos = action.payload;

      return;

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
