import { createContext, useContext, useState } from "react";

// Crear el contexto
const ThemeContext = createContext();

// Hook para usar el contexto fácilmente
export const useTheme = () => useContext(ThemeContext);

// Provider que envuelve toda la app
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // "light" o "dark"

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
