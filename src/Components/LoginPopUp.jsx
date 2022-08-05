import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import {useContext} from "react"
import {AuthContext,UserAuth} from "../Context/AuthContext"
// import { AuthContext, UserAuth } from '../Context/AuthContext'

import GoogleButton from 'react-google-button';
export function Login() {
  const {handleLogin}=useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const handleGsignin=async ()=>{
    // console.log(1);
try {
 await handleLogin()
} catch (error) {
  console.log(error);
}
  }
  return (
    <>
      <Button onClick={onOpen}>Login</Button>
     

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        
      >
        <ModalOverlay />
        <ModalContent borderRadius={"md"}>
       
          <ModalHeader>Login with your account</ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" ref={initialRef} placeholder='Email' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input type="password" placeholder='Password' />
            </FormControl>
          </ModalBody> */}

          <ModalFooter display={"flex"} gap="1rem">
          <GoogleButton type="light" label='Go with Google' onClick={handleGsignin} style={{width: '100%'}} />
            {/* <Button colorScheme='blue' mr={3} onClick={handleLogin}>
              Login
            </Button> */}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          
        </ModalContent>
      </Modal>
    </>
  )
}