import {
  Box,
  Button,
  Flex,
  Image,
  Switch,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Login } from "./LoginPopUp";
import PopHover from "./Popover";
import SearchInput from "./SearchInput";

const NavBar = () => {
  const breakpoints = {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useContext(AuthContext);
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ md: "column", lg: "row" }}
        justifyContent={"space-between"}
        boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
        alignItems="center"
        w="100vw"
        m=".5rem"
        pl=".5rem"
        pr=".5rem"
      >
        <Flex gap="1rem" w="30%">
          <SearchInput />
        </Flex>

        <Flex w="20%" align={"center"} justifyContent="center" h="80%">
          <Link to="/">
            <Image
              h="80%"
              w="70%"
              objectFit={"fill"}
              display={{ sm: "none", md: "block" }}
              src="https://i.imgur.com/UTDXtEu.png"
            />
          </Link>
        </Flex>

        <Flex
          w={{ sm: "50%", lg: "40%" }}
          // boxShadow="base"
          gap=".5rem"
          p="1rem"
          align="center"
          justifyContent="center"
        >
          <Tooltip
            placement="left"
            ml="2rem"
            label="Change Theme"
            stylefontSize="md"
            aria-label="Theme"
          >
            <Box >
              <Switch
                size={["sm", "sm", "lg"]}
                colorScheme="teal"
                onChange={() => toggleColorMode()}
              />

              <Text fontWeight={"medium"}>Theme</Text>
            </Box>
          </Tooltip>

          {!user ? (
            <Box mr="5rem">
            <Login /></Box>
          ) : (
            <Box
              display="flex"
              gap="1rem"
              w="100vw"
              h="50px"
              justifyContent="center"
              pl="1rem"
              pr="1rem"
              alignItems={"center"}
            >
              <Link to="/addquestion">
                <Tooltip
                  placement="bottom"
                  ml="2rem"
                  label="Add Own Collection"
                  stylefontSize="md"
                  aria-label="Theme"
                >
                  <Button size={["sm", "sm", "md"]}>Add Questions</Button>
                </Tooltip>
              </Link>
              <Flex
                alignItems="center"
                w="100%"
                justifyItems="center"
                // textAlign={"center"}
                flexDir={"column"}
              >
                <Link to="/bookmarked">
                  {" "}
                  <Tooltip
                    placement="left"
                    ml="2rem"
                    label="Go to Bokkmarked"
                    stylefontSize="md"
                    aria-label="Theme"
                  >
                    <Image
                      w="30%"
                      m="auto"
                      borderRadius={"full"}
                      src={user.photoURL}
                    />
                  </Tooltip>
                </Link>
                <Text fontSize={"xs"}>{user.displayName}</Text>
              </Flex>

              <PopHover />
            </Box>
          )}

          {/* <Button onClick={() =>toggleColorMode()}>Dark</Button> */}
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
