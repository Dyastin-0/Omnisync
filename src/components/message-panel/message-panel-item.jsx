export const MessagePanelItem = (props) => {
  return (
    <div className='message-container'>
      <p className={`sent-by ${props.isMessageOwner && 'right'}`}> 
        {props.isMessageOwner ?
        `On ${props.timeSent} you` :
         `${props.sentBy} on ${props.timeSent}`}
      </p>
      <p className={`message ${props.isMessageOwner && 'right'}`}> {props.message} </p>
    </div>
  );
}