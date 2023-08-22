import { ColorModeProvider, CSSReset, theme } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import { useState } from "react";
import AllRoutes from "./assets/Pages/Allroutes/AllRoutes";
import { Footer } from "./Components/footer";
import NavBar from "./Components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <div
          style={{ fontFamily: "Heebo", width: "100vw", fontDisplay: "swap" }}
        >
          <NavBar />
          <AllRoutes />
          <Footer />
        </div>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
