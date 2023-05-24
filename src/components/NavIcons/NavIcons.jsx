import React, { useState } from "react";

import Home from "../../img/logo.png";
import Noti from "../../img/noti.png";
import darkMode from "../../img/DarkMode.png";
import lightMode from "../../img/lightMode.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
 import { Link } from "react-router-dom";

const NavIcons = () => {
  const [icon, setIcon] = useState(darkMode);
  const [mode, setMode] = useState(true);
  const [bgcolor, setBgColor] = useState("var(--lightColor)")
  const [cardColor, setCardColor] = useState("rgba(255, 255, 255, 0.64)");
  var theme = document.getElementById("root");
  theme.style.setProperty('--cardColor', cardColor);
  theme.style.setProperty('--ThemeColor',bgcolor)
  

  const changeMode = () => {

    if (mode) {
      setIcon(lightMode);
      setCardColor("rgba(160, 160, 160, 0.64)");
      setBgColor("var(--darkColor)");
      setMode(false);
    }
    else {
      setIcon(darkMode);
     setBgColor("var(--lightColor)");
      setCardColor("rgba(255, 255, 255, 0.64)")
      setMode(true);
    }
  }
  return (
    <div className="navIcons">
      <Link to="../home">
        <img
          style={{
            width: "23px",
            height: "23px",
            background: "#e3aaf1",
            borderRadius: "50%",
            border: "1px",
            borderStyle: "ridge",
            borderColor: "#cb5efd",
            marginTop: "0px",
            padding: "0px"
          }}
          src={Home} alt="" />
      </Link>
      <UilSetting />
      <img src={Noti} alt="" />
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
      <img src={icon} alt="" onClick={changeMode}  />
    </div>
  );
};

export default NavIcons;
