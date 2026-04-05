import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const stored = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initial = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "dark";
document.documentElement.classList.remove("light", "dark");
document.documentElement.classList.add(initial);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
