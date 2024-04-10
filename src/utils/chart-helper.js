export const constructData = (messages) => {
  const latestOn = {};
  const dayTotal = [];

  messages.forEach(message => {
    const { name, action, timeSent } = message;
    const date = new Date(timeSent);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });

    if (action === "on") {
      latestOn[name] = { time: timeSent, day: day };
    } else if (action === "off" && latestOn[name] !== undefined) {
      const diff = timeSent - latestOn[name].time;

      const dayKey = latestOn[name].day;
      let existingDay = dayTotal.find(entry => entry.day === dayKey);
      if (!existingDay) {
        dayTotal.push({ day: dayKey, total: (diff / 3600000) });
      } else {
        existingDay.total += (diff / 3600000);
      }

      delete latestOn[name];
    }
  });

  return dayTotal;
};
