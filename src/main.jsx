import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContextProvider from './Context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import SearchContextProvider from './Context/SeachContex'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
  <ChakraProvider >
  <BrowserRouter>
  <AuthContextProvider>
  <SearchContextProvider>
    <App />
    </SearchContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
    </ChakraProvider>
   
  </React.StrictMode>
)
