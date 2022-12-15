import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const { googleSignIn, githubSignIn, user } = UserAuth();

  const signUp = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user sign up: ", cred.user);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
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
     if (err) {
       toast.error("Password should be at least 6 characters.", {
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

  if (user) navigate("/account");

  return (
    <div className="login">
      <h1>Sign Up</h1>
      <div className="container">
        <button>
          <i className="fab fa-google" onClick={handleGoogleSignIn}></i>
          <p>Sign up with Google</p>
        </button>
        <button>
          <i className="fab fa-github" onClick={handleGithubSignIn}></i>
          <p>Sign in with Github</p>
        </button>

        <p className="divider">
          <span>Or</span>
        </p>

        <form onSubmit={signUp}>
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

          <button onClick={notify}>Sign Up</button>
          <ToastContainer/>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
