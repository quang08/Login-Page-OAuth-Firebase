import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
} from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const GGprovider = new GoogleAuthProvider();
  const GHprovider = new GithubAuthProvider();

  const googleSignIn = async () => {
    await signInWithRedirect(auth, GGprovider).then((res) => {
      console.log(res.user);
    });
  };

  const githubSignIn = async () => {
    await signInWithRedirect(auth, GHprovider)
      .then((res) => {
        console.log(res.user);
      })
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User: ", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, githubSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
