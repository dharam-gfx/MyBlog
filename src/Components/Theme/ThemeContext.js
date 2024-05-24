import { createContext, useContext } from "react";

const themeContext = createContext({
    themeMode:"light",
    lightTheme:()=>{},
    darkTheme:()=>{},
})

export const ThemeProvider = themeContext.Provider;

export const useTheme = () => useContext(themeContext)