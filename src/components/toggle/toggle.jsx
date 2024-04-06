import React from "react";
import './toggle.css';

const Toggle = (props) => {
  return (
    <label className="toggle">
      <input type="checkbox" checked={props.checked} onChange={props.onchange} />
      <span className="slider round"></span>
    </label>
  );
};

export default Toggle;