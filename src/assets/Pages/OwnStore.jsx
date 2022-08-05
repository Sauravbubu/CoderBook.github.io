import { Box } from "@chakra-ui/react";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import OwnStoreQcard from "../../Components/OwnStoreQcard";
import Qcard from "../../Components/Qcard";
import { AuthContext } from "../../Context/AuthContext";
import { db } from "../../FireBase";

const OwnStore = () => {
  const { topic ,user} = useContext(AuthContext);
  const [fdata, setfdata] = useState([]);
  useEffect(() => {
    onSnapshot(doc(db, user.email, `${topic}`), (doc) => {
      setfdata(doc.data()?.questions);
    });
  }, []);
  console.log(fdata);
  return (
    <> <NavBar />
    <Box display="flex" flexDir={"column"} align="center" width="100%" justifyContent="center">
     
      {fdata?.map(({ title, url, level, notes, solution }) => (
        <OwnStoreQcard
          problem={title}
          topic={topic}
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
