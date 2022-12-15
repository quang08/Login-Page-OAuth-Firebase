import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserAuth } from "../context/AuthContext";

function Home() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleHome = async () => {
    navigate("/");
  };

  return (
    <div className="login">
      {user.displayName ? (
        <h1>Welcome {user?.displayName}</h1>
      ) : (
        <h1>Hi there!</h1>
      )}
      <div className="container">
        <p className="divider">
          <span>Connect with Me !</span>
        </p>
        <div className="top">
          <a href="https://github.com/quang08" target="_blank">
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100006804880414"
            target="_blank"
          >
            <i className="fab fa-facebook-square"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/nguyen-the-quang-b8285a227/"
            target="_blank"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/_nguyenthequang_/" target="_blank">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <button
          onClick={handleHome}
          style={{ width: "100%", marginTop: "2rem" }}
        >
          Back Home
        </button>
      </div>
    </div>
  );
}

export default Home;
