import React from 'react';
import "../App.css";
import csLogo from "../assets/Card_Sharks_2019_logo.png";

function Header() {
  return (
    <div className="logo">
      <img className="logo" src={csLogo} alt="Card Sharks" />
    </div>
  )
}

export default Header
