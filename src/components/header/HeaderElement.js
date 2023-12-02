import React from "react";
import { Link } from "react-router-dom";

const HeaderElement = ({ to, label, iconPath }) => {
  return (
    <Link to={to}>
      <>
        <img
          src={iconPath}
          alt=""
          style={{ height: 20, position: "absolute", left: 12, top: 22 }}
        />
        <span style={{ paddingLeft: 20 }}>{label}</span>
      </>
    </Link>
  );
};

export default HeaderElement;
