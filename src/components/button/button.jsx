import React from 'react';

import './button.css';

export const Button = React.forwardRef((props, ref) => {
  return (
    <button
      onClick={props.onclick}
      ref={ref}
      id={props.id}
      className={props.className}>
        {props.text} {props.icon}
      </button> 
  );
});