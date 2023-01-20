import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialStates = {
  bartender: "",
};

export const GlobalContext = createContext(initialStates);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialStates);

  const changeBartender = (bartender) => {
    dispatch({
      type: "CHANGE_BARTENDER",
      payload: bartender,
    });
  };
  return (
    <GlobalContext.Provider
      value={{ bartender: state.bartender, changeBartender }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
