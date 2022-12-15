import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const { googleSignIn, githubSignIn, user } = UserAuth();

  const logIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user logged in: ", cred.user);
      })
      .catch((err) => {
        console.log(err.code);
        setError(true);
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      console.log(e);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await githubSignIn();
    } catch (e) {
      console.log(e);
    }
  };

  const notify = () => {
    if (error) {
      toast.error("Invalid Password or Email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } 
  };

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user]);

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="container">
        <button>
          <i className="fab fa-google" onClick={handleGoogleSignIn}></i>
          <p>Sign in with Google</p>
        </button>
        <button>
          <i className="fab fa-github" onClick={handleGithubSignIn}></i>
          <p>Sign in with Github</p>
        </button>

        <p className="divider">
          <span>Or</span>
        </p>

        <form onSubmit={logIn}>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Enter your E-mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>

          <div className="remember-me">
            <input type="checkbox" checked="checked"></input>
            <p>Remember Me</p>
          </div>

          <button onClick={notify}>Log In</button>
          <ToastContainer />
        </form>

        <div className="bottom">
          <p>Forgot your password ?</p>
          <a href="/resetpassword">Reset Password</a>
        </div>

        <p className="create-acc">
          <a href="/signup">Create Account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
