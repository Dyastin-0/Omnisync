export function currentDateTime() {
  const date = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const dateTime = new Intl.DateTimeFormat('en-US', options).format(date);

  return dateTime;
}