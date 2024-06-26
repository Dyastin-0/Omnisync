import React from "react";
import './toggle.css';

const Toggle = React.forwardRef(({size, checked, onchange}, ref) => {
  return (
  <label className={`toggle ${size}`}>
    <input type="checkbox" ref={ref} checked={checked} onChange={onchange} />
    <span className="slider round"></span>
  </label>
  );
});
export default Toggle;