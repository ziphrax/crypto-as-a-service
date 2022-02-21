import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./navigation.css";

function Navigation() {
  const { pathname } = useLocation();
  const splitLocation = pathname.split("/");

  return (
    <nav className="c-nav">
      <ul className="c-nav__list">
        <li
          className={
            splitLocation[1] === ""
              ? "c-nav__list-item--active"
              : "c-nav__list-item"
          }
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={
            splitLocation[1] === "wallet"
              ? "c-nav__list-item--active"
              : "c-nav__list-item"
          }
        >
          <Link to="/wallet">Wallet</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
