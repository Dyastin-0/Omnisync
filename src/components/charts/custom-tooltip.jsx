import './custom-tooltip.css';

export const CustomTooltip = ({active, payload, label}) => {
  if (active && payload && label) {
    return (
      <div className='tooltip'>
        <h5>{label}</h5>
        {payload.map((load, key) => (
          <div className='row' key={key}>
            <h5>{load.name}</h5>
            <p>{`${load.value.toFixed(3)} ${load.value.toFixed(3) > 1 ? `hours` : 'hour'}`}</p>
          </div>
        ))}
      </div>
    );
  }
}