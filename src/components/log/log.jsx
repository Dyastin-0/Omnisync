export const Log = ({isMessageOwner, sentBy, timeSent, message}) => {
  return (
    <div className='message-container'>
      <p className={`sent-by ${isMessageOwner && 'right'}`}> 
        {isMessageOwner ?
        `On ${timeSent} you` :
         `${sentBy} on ${timeSent}`}
      </p>
      <p className={`message ${isMessageOwner && 'right'}`}> {message} </p>
    </div>
  );
}