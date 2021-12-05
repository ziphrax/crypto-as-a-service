import React from 'react';
import { Link } from "react-router-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import Home from './routes/home'
import WalletPage from './routes/wallet';

function App() {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
              <Link to="/wallet">Wallet</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
      </div>
  );
}

export default App;
