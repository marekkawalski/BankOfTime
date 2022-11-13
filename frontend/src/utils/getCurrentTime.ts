export const getCurrentTime = (): string => {
  let today = new Date();
  return new Date().getHours() + ":" + today.getMinutes();
};
