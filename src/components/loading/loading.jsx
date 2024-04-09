import './loading.css';

export const Loading = (props) => {
  return (
    <div className='loading'>
      <h4>{props.text}</h4>
      <i className='fa-solid fa-circle-notch rotate-infinite'></i>
    </div>
  );
};