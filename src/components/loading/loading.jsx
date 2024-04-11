import './loading.css';

export const Loading = (props) => {
  return (
    <div className='loading'>
      <h4>{props.text}</h4>
      <i className="fa-solid fa-slash fa-spin"></i>
      {props.content}
    </div>
  );
};