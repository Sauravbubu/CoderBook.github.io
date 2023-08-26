import React, { useState, useContext } from "react";
import {
  DeleteIcon,
  ExternalLinkIcon,
  PlusSquareIcon,
  StarIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Button,
  Box,
  Link,
  Text,
  Accordion,
  Tooltip,
} from "@chakra-ui/react";
import { db } from "../FireBase";
import {
  arrayUnion,
  doc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import { AuthContext } from "../Context/AuthContext";
import Acordion from "./Acordion";

const OwnStoreQcard = ({ problem, URL, level, notes, solution }) => {
  // console.log(problem, URL, level,notes,solution);
  const [done, setdone] = useState(false);
  const [bookmark, setbookmark] = useState(false);
  const { user, topic, Owndata, setOwndata, coll, setcoll } =
    useContext(AuthContext);
  // console.log(Owndata);
  const userId = doc(db, "user", `${user?.email}`);
  //  console.log(user?.email,"Qcard")
  const handleBookmark = async (problem) => {
    if (user?.email) {
      setbookmark(!bookmark);
      await updateDoc(userId, {
        bookmarked: arrayUnion({ problem: problem, URL: URL }),
      });
    } else {
      alert("Login To Bookmark");
    }
  };
  const handleDone = async () => {
    if (user?.email) {
      setdone(!done);
      await updateDoc(userId, {
        completed: arrayUnion(problem),
      });
    } else {
      alert("Login to make changes");
    }
  };

  //deleteBookmark
  const bookmarkRef = doc(db, user.email, `${topic}`);
  const deleteBookmark = async (problem) => {
    try {
      const results = Owndata.filter((item) => item.title !== problem);
      // console.log(results)
      await updateDoc(bookmarkRef, { questions: results });
      setcoll(!coll);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      boxShadow="Inner"
      w={['100%',"90%"]}
      m="auto"
      border="1px"
      borderColor="lightblue"
      mb="1rem"
      p="6"
      rounded="md"
      justifyContent="space-between"
    >
      <Flex direction="column">
        <Text fontSize={["sm", "md", "xl"]} fontWeight="bold">
          {problem}
        </Text>
        <Flex direction="column">
          <Link
            bg="tomato"
            borderRadius="lg"
            color="whitesmoke"
            p="0.31em"
            pr="-30px"
            href={URL}
            fontSize={["10px", "20px"]}
            isExternal
          >
            Solve Now <ExternalLinkIcon mx="2px" />
          </Link>
          <Button size="sm" variant="ghost">
            Level: {level}
          </Button>
        </Flex>
      </Flex>
      <Flex direction="column" gap=".5rem">
        <Link
          bg="blackAlpha.500"
          borderRadius="lg"
          color="whitesmoke"
          p="0.2em"
          fontSize={["10px", "20px"]}
          href={solution}
          isExternal
        >
          Link to Solution <ExternalLinkIcon mx="2px" />
        </Link>
        <Acordion notes={notes} />
      </Flex>
      <Flex
        flexDir={"column"}
        align="center"
        justifyContent="center"
        gap="1rem"
      >
        <Button
          size={["sm", "xs", "md"]}
          bg={!done ? "pink.700" : "green.600"}
          onClick={() => handleDone(problem)}
          color="white"
        >
          {done ? "completed" : "Pending"}
        </Button>
        <Flex align="center">
          <Button
            cursor="pointer"
            onClick={() => handleBookmark(problem)}
            variant="outline"
            size={["xs", "md"]}
            rightIcon={<PlusSquareIcon />}
          >
            Bookmark it
          </Button>{" "}
          <Tooltip
            placement="left"
            ml="2rem"
            label="delete"
            stylefontSize="md"
            aria-label="Theme"
          >
            <Button onClick={() => deleteBookmark(problem)}>
              <DeleteIcon />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OwnStoreQcard;
