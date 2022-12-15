import React, { useState, useCallback } from "react";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");
  const navigate = useNavigate();

  const notify = () =>
    toast.success("Email Sent! Check your Spam", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });;

  const resetPassword = async (e) => {
    e.preventDefault();

    await sendPasswordResetEmail(auth, verifyEmail)
      .then(() => {
        console.log("email sent");
      })
      .catch((e) => {
        console.log(e);
      });
    setTimeout(() => navigate("/login"),3000);
  };

  return (
    <div className="login">
      <h1>Reset Password</h1>
      <div className="container">
        <form onSubmit={resetPassword}>
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Enter verification E-mail"
            onChange={(e) => {
              setVerifyEmail(e.target.value);
            }}
          ></input>
          <button onClick={notify}>Reset</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
