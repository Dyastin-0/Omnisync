export const MessagePanelItem = (props) => {
  return (
    <>
      <p className={`sent-by ${props.isMessageOwner && 'right'}`}> {props.sentBy} </p>
      <p className={`message ${props.isMessageOwner && 'right'}`}> {props.message} </p>
    </>
  );
}