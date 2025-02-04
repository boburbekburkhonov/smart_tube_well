/** @format */

import { TOGGLE_THEME } from "../actions/themeType";

const initialTheme = localStorage.getItem("theme") || "light";

const initialState = {
  theme: initialTheme,
  colors: {
    background: initialTheme === "light" ? "#37424e" : "#F3F7FF",
    isActiveBackground: initialTheme === "light" ? "#F3F7FF" : "#F3F7FF",
    isActiveColor: initialTheme === "light" ? "#37424e" : "#262A35",
    layoutBackground: initialTheme === "light" ? "#1A998E" : "#176B87",
    loginBackground: initialTheme === "light" ? "#F3F7FF" : "#F3F7FF",
    buttonColor: initialTheme === "light" ? "#1A998E" : "#176B87",
    text: initialTheme === "light" ? "#FFFFFF" : "#FAFAFA",
    loginHeadingColor: initialTheme === "light" ? "#1A998E" : "#176B87",
  },
};

const themes = {
  light: {
    background: "#F3F7FF",
    layoutBackground:  "#1A998E",
    loginBackground:  "#F3F7FF",
    isActiveBackground: "#F3F7FF",
    isActiveColor: "#37424e",
    buttonColor: "#1A998E",
    text: "#FFFFFF" ,
    loginHeadingColor: "#1A998E"
  },
  dark: {
    background: "#37424e",
    layoutBackground:  "#176B87",
    loginBackground:  "#F3F7FF",
    isActiveBackground: "#F3F7FF" ,
    isActiveColor: "#262A35",
    buttonColor: "#176B87",
    text:"#FAFAFA",
    loginHeadingColor: "#176B87"
  },
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      const newTheme = state.theme === "light" ? "dark" : "light";

      localStorage.setItem("theme", newTheme);

      return {
        ...state,
        theme: newTheme,
        colors: themes[newTheme],
      };
    default:
      return state;
  }
};

export default themeReducer;
