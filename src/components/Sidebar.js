import React from 'react';
import '../styles/sidebar.css';
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-menu">
        <div className="sidebar-option">
          <p>PUBLIC</p>
          <div className="menu-group">
            <div className="menu-item">
              <Link to="/">Questions</Link>
            </div>
            <div className="menu-item">
              <Link to="/">Tags</Link>
            </div>
            <div className="menu-item">
              <Link to="/">Users</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;


