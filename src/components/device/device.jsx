import Toggle from '../toggle/toggle';
import { useData } from '../../contexts/data/data';

export const Device = ({toggleName, sentBy, className, icon, index, checked}) => {
  const { setToggleState } = useData();

  const handleChange = (e) => {
    const newState = e.target.checked;
    const state = newState ? "on" : "off";
    const message = {
      action: state,
      name: toggleName,
      sentBy: sentBy,
      message: `turned ${state} the ${toggleName}.`,
      timeSent: new Date().getTime()
    }
    setToggleState(toggleName, newState, message);
  };

  return (
    <div className={className} >
      <div className='row'>
        <p>{`${index}.`}</p>
        <p className='description'> {toggleName} </p>
        {icon}
      </div>
      <Toggle checked={checked} onchange={handleChange} />
    </div>
  );
}