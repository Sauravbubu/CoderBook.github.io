import { ColorModeProvider, CSSReset, theme } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import AllRoutes from "./assets/Pages/Allroutes/AllRoutes";
import { Footer } from "./Components/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <div style={{fontFamily: 'Heebo' ,"fontDisplay": "swap"}}>
          <AllRoutes />
          <Footer />
        </div>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
