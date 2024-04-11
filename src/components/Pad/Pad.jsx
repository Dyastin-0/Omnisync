export const Pad = (props) => {
  return (
    <div className={`content-panel flex-max ${props.options ? `${props.options.panel}` : ''}`} >
      <div className={`container ${props.options ? `${props.options.container}` : ''}`}> 
        {props.content}
      </div>
    </div>
  );
};