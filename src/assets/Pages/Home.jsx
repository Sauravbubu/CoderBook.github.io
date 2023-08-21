import React, { useContext, useState } from "react";
// import { data } from "../../data";
import {
  Flex,
  Box,
  Input,
  Button,
  useDisclosure,
  Text,
  Image,
  useColorMode,
  Switch,
} from "@chakra-ui/react";
import TabPannel from "./TabPannel";
import { Login } from "../../Components/LoginPopUp";
import { SearchContext } from "../../Context/SeachContex";
// import { ResultDrawer } from "../../Components/SearchModal";
import { AuthContext } from "../../Context/AuthContext";
import PopHover from "../../Components/Popover";
import SearchInput from "../../Components/SearchInput";
import { Link } from "react-router-dom";

import NavBar from "../../Components/NavBar";
import LandingPage from "../../Components/LandingPage";
import FrontendPart from "../../Components/FrontendPart";
const Home = () => {
  const { user, Logout } = useContext(AuthContext);
  const { setsearchdata, searchdata } = useContext(SearchContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      bgColor="#28282B0"
      backdropFilter="auto"
      backdropBlur="6px"
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      {/* <Banner/> */}
      {/* <NavBar /> */}
      <LandingPage />

      {/* <FrontendPart/> */}
      {/* <TabPannel /> */}
    </Box>
  );
};

export default Home;
