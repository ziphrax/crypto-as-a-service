import React from "react";
import {  Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./routes/home";
import WalletPage from "./routes/wallet";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="c-app">
      <Header>
        <Navigation />
      </Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
      <Footer>
        <p className="u-center">Copyright {new Date().getFullYear()}</p>
      </Footer>
    </div>
  );
}

export default App;
