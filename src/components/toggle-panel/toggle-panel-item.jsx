import Toggle from '../toggle/toggle';
import { useData } from '../../contexts/data/data';

export const TogglePanelItem = (props) => {
  const { setToggleState } = useData();

  const handleChange = (e) => {
    const newState = e.target.checked;
    const state = newState ? "on" : "off";
    const message = {
      action: state,
      name: props.toggleName,
      sentBy: props.sentBy,
      message: `turned ${state} the ${props.toggleName}.`,
      timeSent: new Date().getTime()
    }
    setToggleState(props.toggleName, newState, message);
  };

  return (
    <div className={props.className} >
      <div className='row'>
        <h5>{`${props.index}.`}</h5>
        <p> {props.toggleName} </p>
      </div>
      <Toggle checked={props.checked} onchange={handleChange} />
    </div>
  );
}