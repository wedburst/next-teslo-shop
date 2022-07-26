import React, { useReducer } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIALSTATE: UiState = {
  isMenuOpen: false,
};

export const UiProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIALSTATE);

  const toggleSideMenu = () => dispatch({ type: "[UI] - ToggleMenu" });

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Method
        toggleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
