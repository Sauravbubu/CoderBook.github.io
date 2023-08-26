import { Box } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import OwnStoreQcard from "../../Components/OwnStoreQcard";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../FireBase";

const OwnStore = () => {
  const { user, setOwndata, topic, coll } = useContext(AuthContext);
  const [List, setList] = useState([]);

  useEffect(() => {
    async function getDocss() {
      const docRef = doc(db, user.email, topic);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data().questions;
        setList(data);
        setOwndata(data);
      } else {
        console.log("No such document!");
      }
    }

    if (user?.email && db && topic) getDocss();
  }, [user.email, coll]);

  return (
    <Box
      display="flex"
      flexDir="column"
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
  );
};

export default OwnStore;
