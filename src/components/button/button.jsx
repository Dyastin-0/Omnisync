import './button.css';

export const Button = (props) => {
  return (
    <button onClick={props.onclick} id={props.id} className={props.className}> {props.text} {props.icon} </button> 
  );
};