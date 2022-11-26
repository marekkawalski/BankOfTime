export const getCurrentTime = (): string => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  let minuteString = minute.toString();
  let hourString = hour.toString();
  if (minute < 10) minuteString = "0" + minute;
  if (hour < 10) hourString = "0" + hour;
  return `${hourString}:${minuteString}`;
};
