import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
const DarKModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarKModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarKModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarKModeContext);
  if (context === undefined)
    throw new Error("DarkMode context was used outside its provider");
  return context;
}

export { useDarkMode, DarkModeProvider };
