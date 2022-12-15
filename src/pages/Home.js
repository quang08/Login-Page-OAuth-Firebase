import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login">
      <h1>Welcome</h1>
      <div className="container">
        <h2>
          <span>Sign in and Let's connect!</span>
        </h2>
        {user ? (
          <button
            onClick={handleSignOut}
            style={{ width: "100%", marginTop: "2rem" }}
          >
            Log Out
          </button>
        ) : (
          <Link className="link" to="/login">
            <button style={{ width: "100%", marginTop: "2rem" }}>
              Sign in
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
