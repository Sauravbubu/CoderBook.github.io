import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

import {
  Flex,
  Button,
  Box,
  Link,
  Text,
  Switch,
  useColorMode,
  useDisclosure,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { db } from "../../FireBase";
import { AuthContext } from "../../Context/AuthContext";
import Qcard from "../../Components/Qcard";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import SearchInput from "../../Components/SearchInput";
import PopHover from "../../Components/Popover";
import NavBar from "../../Components/NavBar";

const Completed = () => {
  const { user } = useContext(AuthContext);
  const [fdata, setfdata] = useState([]);
  const [mdata, setmdata] = useState([]);
  useEffect(() => {
    axios.get("https://mini-db.herokuapp.com/api/questions?").then((res) => {
      // res.data.filter((qn)=>qn.questions)
      // console.log(res.data)

      setmdata(res.data);
    });

    onSnapshot(doc(db, "user", `${user?.email}`), (doc) => {
      setfdata(doc.data()?.completed);
    });
  }, [user?.email]);
  // console.log(fdata);

  const bookmarkRef = doc(db, "user", `${user?.email}`);
  const deleteBookmark = async (problem) => {
    try {
      const results = fdata.filter((item) => item.problem !== problem);
      await updateDoc(bookmarkRef, { completed: results });
    } catch (error) {
      console.log(error);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <NavBar/>
      <Text textAlign={"center"} fontSize={"4xl"}>
       All Completed Questions
      </Text>

      <Flex flexDir="column" align={"center"}>
        {fdata?.map((el) => (
          <Flex
            boxShadow="Inner"
            w="90%"
            align={"center"}
            ml=".5rem"
            mr="1rem"
            border="1px"
            borderColor="lightblue"
            mb="1rem"
            p="6"
            rounded="md"
            justifyContent="space-between"
          >
            <Flex direction="column">
              <Text fontSize={["sm", "sm", "md"]} fontWeight="bold">
                {el.problem}
              </Text>
              <Box mt="1rem">
                <Link
                  bg="purple.500"
                  borderRadius="xl"
                  color="whitesmoke"
                  p="0.31em"
                  pr="-30px"
                  href={el.URL}
                  isExternal
                >
                  Solve Now <ExternalLinkIcon mx="2px" />
                </Link>
              </Box>
            </Flex>
            <Tooltip  placement='left' ml="2rem" label='Delete' stylefontSize='md' aria-label='Theme'>

            <Button onClick={() => deleteBookmark(el.problem)}>
              <DeleteIcon />
            </Button>
            </Tooltip>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default Completed;
