import { useTheme } from "../../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-outline-light ms-2 d-flex align-items-center justify-content-center"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        padding: 0,
      }}
      aria-label="Cambiar tema"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
