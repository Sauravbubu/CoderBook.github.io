import { Button, Spinner,Flex, FormLabel, Input } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../FireBase";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Addcollection = ({ updateCollectionList }) => {
  const { user, setcoll, coll, settopic } = useContext(AuthContext);
  const [collectionadd, setCollectionadd] = useState("");
  const [collectionList, setCollectionList] = useState([]);

  const addCollection = async () => {
    await setDoc(doc(db, user.email, collectionadd), {
      questions: [],
    });
    setcoll(!coll);
    updateCollectionList();
  };

  const deleteCollection = async (collectionName) => {
    await deleteDoc(doc(db, user.email, collectionName));
    updateCollectionList();
  };

  useEffect(() => {
    async function getCollectionNames() {
      const querySnapshot = await getDocs(collection(db, user.email));
      const collectionNames = querySnapshot.docs.map((doc) => doc.id);
      setCollectionList(collectionNames);
    }
    user?.email && getCollectionNames();
  }, [user.email]);

  return (
    <Flex gap="1rem" w="20vw" flexDir={"column"}>
      <FormLabel textAlign={"center"}>Add a collection Name</FormLabel>
      <Input
        onChange={(e) => setCollectionadd(e.target.value)}
        type="text"
        placeholder="Enter a Collection Name"
      />
      <Button bg="blue.200" onClick={addCollection}>
        Add
      </Button>
      {collectionList?.length ? (
        <>
          {" "}
          {collectionList?.map((el, i) => (
            <Flex key={i} align="center" justify="space-between">
              <Link to="/ownstore">
                <Button
                  size={["sm", "sm", "md"]}
                  textTransform="uppercase"
                  w="100%"
                  bg="orange.200"
                  onClick={() => {
                    settopic(el);
                  }}
                >
                  {el}
                </Button>{" "}
              </Link>
              <Button
                size="sm"
                bg="red.500"
                onClick={() => deleteCollection(el)}
              >
                Delete
              </Button>
            </Flex>
          ))}
        </>
      ) : (
       <Spinner margin={'auto'} color="red.200"/>
      )}
    </Flex>
  );
};

export default Addcollection;
