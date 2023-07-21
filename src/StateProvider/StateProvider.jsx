import React, { useReducer } from "react";
import { createContext, useContext } from "react";
var Context = createContext();
const StateProvider = ({ children, initial, reducer }) => {
  return (
    <Context.Provider value={useReducer(reducer, initial)}>
      {children}
    </Context.Provider>
  );
};
export const useStateProvider = () => useContext(Context);
export default StateProvider;
