import React, { useCallback, useState } from "react";
import useLocalStorage from "use-local-storage";
import { Route, Routes, Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import ResetPassword from "./pages/ResetPassword";
import Protected from "./components/Protected";

function App() {
  //persist theme on refreshes !! - use local storage to remember the theme
  //check if there's a local session named 'theme'. if there's not, init it as default: light
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  const [text, setText] = useState("Light Theme");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    const newText = theme === "dark" ? "Light Theme" : "Dark Theme";
    setText(newText);
  };

  return (
    <div className="app" data-theme={theme}>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Protected><Account /></Protected>} />
          <Route path="/resetpassword/*" element={<ResetPassword />} />
        </Routes>
      </AuthContextProvider>

      <div className="theme-toggle">
        <h2>{text}</h2>
        <i onClick={switchTheme} className="fas fa-toggle-on"></i>
      </div>
    </div>
  );
}

export default App;
