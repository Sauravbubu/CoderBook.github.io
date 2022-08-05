import { Box, Button, Flex, Image, Switch, Text, useColorMode, useDisclosure } from '@chakra-ui/react'
import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext';
import { Login } from './LoginPopUp';
import PopHover from './Popover';
import SearchInput from './SearchInput';

const NavBar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
  const {colorMode,toggleColorMode}=useColorMode()
  const { user } = useContext(AuthContext);
  return (
   <>
    <Box
        display="flex"
        justifyContent={"space-between"}
        boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
        alignItems="center"
        w="100%"
        m=".5rem"
      >
        <Flex gap="1rem" w="30%">
          <SearchInput />
        </Flex>

        <Flex w="20%" align={"center"} justifyContent="center" h="80%" >
          <Link to="/">
            <Image h="80%" w="70%"  objectFit={'fill'}  src="public\images\codebook1.png"/>
          </Link>
        </Flex>

        <Flex w="40%" boxShadow="base" gap=".5rem" p="1rem" align="center">
          <Switch size={["sm", "sm", "md"]}
            colorScheme="teal"
            onChange={() => toggleColorMode()}
           
          />
          {!user ? (
            <Login />
          ) : (
            <Box
              display="flex"
              gap="1rem"
              w="100%"
              h="50px"
              justifyContent="center"
              alignItems={"center"}
            >
              <Link to="/addquestion">
            
                <Button   size={["sm", "sm", "md"]}>
                  Add Questions
                </Button>{" "}
              </Link>
              <Flex
                alignItems="center"
                w="100%"
                justifyItems="center"
                textAlign={"center"}
                flexDir={"column"}
              >
                <Link to="/bookmarked">
                  {" "}
                  <Image
                    w="30%"
                    m="auto"
                    
                    borderRadius={"full"}
                    src={user.photoURL}
                  />
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
  )
}

export default NavBar