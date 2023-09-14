import React from 'react';
import { useSelector } from "react-redux";
import '../styles/header.css';
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

function Header() {
  const user = useSelector(selectUser);

  function getColorFromString(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
  }

  function getAvatarFromName(name) {
    return {
      sx: {
        bgcolor: name ? getColorFromString(name) : "rgba(255,255,255,0.8)",
      },
      children: name && `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <a href="/">Stack Overflow Clone</a>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/auth">
                <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
              </Link>
            </li>
            <li>
              <Link to="/new-question">
                <button className="ask-question-button">Ask Question</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
