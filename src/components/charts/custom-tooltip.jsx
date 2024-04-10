import './custom-tooltip.css';

export const CustomTooltip = ({active, payload, label}) => {
  if (active && payload && label) {
    return (
      <div className='tooltip'>
        <h5>{label}</h5>
        <div className='row'>
          <h5>Total hours</h5>
          <p>{payload[0].value}</p>
        </div>
      </div>
    );
  }
}