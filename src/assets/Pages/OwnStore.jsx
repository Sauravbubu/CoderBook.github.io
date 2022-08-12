import { Box } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import OwnStoreQcard from "../../Components/OwnStoreQcard";
import Qcard from "../../Components/Qcard";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../FireBase";

const OwnStore = () => {
  // const { topic, user } = useContext(AuthContext);
  const { user,setOwndata,Owndata ,topic,coll} = useContext(AuthContext);
  const [List, setList] = useState([]);
  let data = [];
  useEffect(() => {
    console.log(topic);

    async function getDocss() {
      // const equipment =  collection(db, user.email,topic);
      const docRef = doc(db, user.email, topic);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
         data = docSnap.data().questions;
         
        // console.log("Document data:", docSnap.data().questions);

        console.log(data, "data");
        setList([...data])
        setOwndata([...data])
      } else {
       
        console.log("No such document!");
      }
    
    }

    getDocss();
  }, [user.email,coll]);

  console.log(List);
  return (
    <>
    
      <NavBar />
      <Box
        display="flex"
        flexDir={"column"}
        align="center"
        width="100%"
        justifyContent="center"
      >
        {List?.map(({ title, url, level, notes, solution }) => (
          <OwnStoreQcard
            problem={title}
            key={url}
            URL={url}
            level={level}
            notes={notes}
            solution={solution}
          />
        ))}
      </Box>
    </>
  );
};

export default OwnStore;
