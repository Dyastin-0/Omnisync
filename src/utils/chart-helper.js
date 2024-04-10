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
        existingDay = { day: dayKey, total: 0 };
        dayTotal.push(existingDay);
      }
      existingDay.total += diff / 3600000;

      if (!existingDay[name]) {
        existingDay[name] = 0;
      }
      existingDay[name] += diff / 3600000;

      delete latestOn[name];
    }
  });

  return dayTotal;
};
