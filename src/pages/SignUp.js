import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { googleSignIn, user } = UserAuth();

  const signUp = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user sign up: ", cred.user);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate('/account');
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="login">
      <h1>Sign Up</h1>
      <div className="container">
        <div className="top">
          <button>
            <i className="fab fa-google" onClick={handleGoogleSignIn}></i>
            <p>Sign up with Google</p>
          </button>
        </div>

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

          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
