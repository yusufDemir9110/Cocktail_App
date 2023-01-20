import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialStates = {
  bartender: "",
  userName: "Customer",
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
  const changeUserName = (userName) => {
    dispatch({
      type: "CHANGE_USERNAME",
      payload: userName,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        bartender: state.bartender,
        changeBartender,
        userName: state.userName,
        changeUserName,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
