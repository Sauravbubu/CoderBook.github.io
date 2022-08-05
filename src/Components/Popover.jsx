import React ,{useContext} from 'react'
import { AuthContext } from "../Context/AuthContext";

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
    Portal,
    Text,
    Flex,
    Tooltip,
    
  } from '@chakra-ui/react'
  import {Link} from 'react-router-dom'
  import {SettingsIcon} from '@chakra-ui/icons'
const PopHover = () => {
    const { user,Logout } = useContext(AuthContext);
    // console.log(user.metadata.lastSignInTime);
  return (
   
    <Popover>
  <PopoverTrigger>

    <Button variant={"none"}>

        
    <SettingsIcon/>Settings  </Button> 
  </PopoverTrigger>
  <Portal >
    <PopoverContent  w="400px">
      <PopoverArrow />
      <PopoverHeader fontSize={"xl"} fontWeight="bold" color="teal.600" >{user.displayName}</PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody >
      <Flex flexDir="column" gap="2rem">
      <Text fontSize={"lg"} fontWeight="bold">Email - {user.email}</Text>
      <Flex gap="2rem">
     <Link to="/bookmarked"><Button bg="orange.300"> Bookmarked</Button></Link> 
     <Link to="/completed"><Button bg="green.300">Completed</Button></Link> 
     </Flex>
        <Button w="20%" colorScheme='blue' size={"sm"} onClick={()=>{Logout()}}>Logout</Button>
        </Flex>

      </PopoverBody>
      <PopoverFooter> Login Date{user?.metadata?.lastSignInTime}</PopoverFooter>
    </PopoverContent>
  </Portal>
</Popover>
  )
}

export default PopHover