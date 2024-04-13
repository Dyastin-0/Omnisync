import React from "react";
import './toggle.css';

const Toggle = React.forwardRef((props, ref) => {
  return (
  <label className={`toggle ${props.size}`}>
    <input type="checkbox" ref={ref} checked={props.checked} onChange={props.onchange} />
    <span className="slider round"></span>
  </label>
  );
});
export default Toggle;