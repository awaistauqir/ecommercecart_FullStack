import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Backdrop from "./Components/Backdrop";
import SideDrawer from "./Components/SideDrawer";
import { HomeScreen, ProductScreen, CartScreen } from "./screens";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import CartContextProvider from "./store/Provider";
function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const theme = {
    showDrawer: sideToggle ? "0" : "-100%",
  };
  const handleSideToggle = () => {
    setSideToggle(true);
    console.log("hamburger clicked");
  };
  const handleBackdropToggle = () => {
    setSideToggle(false);
    console.log("clicked back");
  };
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CartContextProvider>
          {sideToggle && <Backdrop click={handleBackdropToggle} />}
          <Navbar clickButton={handleSideToggle} />
          {sideToggle && <SideDrawer />}

          <main>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
            </Routes>
          </main>
        </CartContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
