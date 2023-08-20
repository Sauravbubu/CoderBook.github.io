import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../FireBase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import axios from "axios";
import { Tooltip } from "@chakra-ui/react";
import { baseurl } from "../constant";

export const AuthContext = createContext();

//DSA
export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [coll, setcoll] = useState(false);
  const [topic, settopic] = useState("");
  const [user, setuser] = useState({});
  const [data, setdata] = useState([]);
  const [Owndata, setOwndata] = useState([]);
  function handleLogin() {
    // console.log("authin");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  const Logout = () => {
    signOut(auth);
    setuser({});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(topic)
      setuser(currentUser);
      axios
        .get(`${baseurl}users`)
        .then((res) => {
          // console.log(res.data)
          setdata(res.data);
          let flag = false;
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].id == currentUser.email) {
              // console.log("res.data[i].id",res.data[i].id);
              flag = true;
            }
          }

          if (flag === false) {
            setDoc(doc(db, currentUser.email, "list(Preset)"), {
              //dynamicaly will be created on add collection
              e: [],
            });
            setDoc(doc(db, "user", currentUser.email), {
              bookmarked: [],
              completed: [],
              ownquestions: [],
            });

            // console.log(flag);
          }
        })
        .catch((error) => {
          // console.log(error);
        });
      // console.log("Cuser",currentUser.email);

      axios
        .post(`${baseurl}users`, {
          id: currentUser.email,
        })
        .then((res) => {})
        .catch((error) => {
          // console.log(error);
        });
    });

    return () => {
      unsubscribe();
    };
  }, [topic]);

  useEffect(() => {}, [data]);
  console.log("user", user);

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
