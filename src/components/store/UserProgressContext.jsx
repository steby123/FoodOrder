import React, { createContext, useReducer } from "react";

const ProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
});

const ProgressReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_CART":
      return { ...state, progress: "CART" };
    case "HIDE_CART":
      return {...state, progress: ""};
    case "HIDE_CHECK_OUT":
      return {...state, progress: ""};
    case "SHOW_CHECK_OUT":
      return { ...state, progress: "CHECK_OUT" };
    default:
      return state;
  }
};

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useReducer(ProgressReducer, {
    progress: "",
  });

  const showCart = () => {
    setUserProgress({
      type: "SHOW_CART",
    });
  };

  const hideCart = () => {
    setUserProgress({
      type: "HIDE_CART",
    });
  };

  const showCheckOut = () => {
    setUserProgress({
      type: "SHOW_CHECK_OUT",
    });
  };

  const hideCheckOut = () => {
    setUserProgress({
      type: "HIDE_CHECK_OUT",
    });
  };

  const userProgressCtx = {
    progress: userProgress.progress,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckOut,
  };

  console.log(userProgressCtx.progress);

  return (
    <ProgressContext.Provider value={userProgressCtx}>
      {children}
    </ProgressContext.Provider>
  );
}

export default ProgressContext;
