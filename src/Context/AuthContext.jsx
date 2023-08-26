import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../FireBase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import axios from "axios";
import { Tooltip } from "@chakra-ui/react";
import { baseurl } from "../constant";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [coll, setcoll] = useState(false);
  const [topic, settopic] = useState("");
  const [user, setuser] = useState({});
  const [data, setdata] = useState([]);
  const [Owndata, setOwndata] = useState([]);
  function handleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  const Logout = () => {
    signOut(auth);
    setuser({});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
      !data &&
        axios.get(`${baseurl}users`).then((res) => {
          setdata(res.data);

          const userExists = res.data.some((u) => u.id === currentUser.email);
          if (!userExists) {
            setDoc(doc(db, currentUser.email, "list(Preset)"), {
              e: [],
            });
            setDoc(doc(db, "user", currentUser.email), {
              bookmarked: [],
              completed: [],
              ownquestions: [],
            });

            axios.post(`${baseurl}users`, {
              id: currentUser.email,
            });
          }
        });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogin,
        Owndata,
        setOwndata,
        Logout,
        setcoll,
        coll,
        topic,
        settopic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
