export const constructData = (messages) => {
  const latestOn = {};
  const dayTotal = [];

  Object.values(messages).forEach(message => {
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

export const deconstructData = (data) => {
  const highestUsagePerDay = []; 

  data.forEach(entry => {
    let highestUsageDevice = null;
    let highestUsage = 0;
    Object.keys(entry).forEach(key => {
      if (key !== "day" && key !== "total" && entry[key] > highestUsage) {
        highestUsage = entry[key];
        highestUsageDevice = key;
      }
    });
    highestUsagePerDay.push({ day: entry.day, total: entry.total, highestDevice: highestUsageDevice, highestUsage: entry[highestUsageDevice] });
  });

  return highestUsagePerDay;
} 
