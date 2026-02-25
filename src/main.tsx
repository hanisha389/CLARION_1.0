import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Default to dark mode
const savedTheme = localStorage.getItem('clarion_theme');
if (!savedTheme || savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById("root")!).render(<App />);
