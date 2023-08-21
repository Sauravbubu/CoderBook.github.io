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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="space-between"
        boxShadow="md"
        alignItems="center"
        w="100vw"
        p=".5rem"
      >
        <Flex gap="1rem" w="100%">
          <SearchInput />
        </Flex>

        <Flex w="100%" align="center" justifyContent="center" h="80%">
          <Link to="/">
            <Image
              w="15vw"
              margin="auto"
              objectFit="fill"
              display={{ base: "none", md: "block" }}
              src="https://i.imgur.com/UTDXtEu.png"
            />
          </Link>
        </Flex>

        <Flex
          w="100%"
          gap=".5rem"
          p="1rem"
          align="center"
          justifyContent="center"
        >
          <Tooltip label="Change Theme" fontSize="md" aria-label="Theme">
            <Box>
              <Switch
                size={["sm", "lg"]}
                colorScheme="teal"
                onChange={toggleColorMode}
              />
              <Text fontWeight="medium">Theme</Text>
            </Box>
          </Tooltip>

          {!user ? (
            <Box mr="5rem">
              <Login />
            </Box>
          ) : (
            <Flex
              alignItems="center"
              w="100%"
              justifyContent="center"
              pl="1rem"
              pr="1rem"
            >
              <Link to="/addquestion">
                <Tooltip
                  label="Add Own Collection"
                  fontSize="md"
                  aria-label="Theme"
                >
                  <Button size={["sm", "md"]}>Add Questions</Button>
                </Tooltip>
              </Link>

              <Flex alignItems="center" w="100%" flexDir="column">
                <Link to="/bookmarked">
                  <Tooltip
                    label="Go to Bookmarked"
                    fontSize="md"
                    aria-label="Theme"
                  >
                    <Image
                      w="30%"
                      m="auto"
                      borderRadius="full"
                      src={user.photoURL}
                    />
                  </Tooltip>
                </Link>
                <Text fontSize="xs">{user.displayName}</Text>
              </Flex>

              <PopHover />
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
