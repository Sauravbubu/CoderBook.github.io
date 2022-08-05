import { ColorModeProvider, CSSReset, theme } from '@chakra-ui/react'
import { ThemeProvider } from '@emotion/react'
import { useState } from 'react'
import AllRoutes from './assets/Pages/Allroutes/AllRoutes'

import Home from './assets/Pages/Home'
import { Footer } from './Components/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
    <ColorModeProvider>
    <CSSReset/>
    <>
    <AllRoutes/>
      <Footer/>
      </>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
