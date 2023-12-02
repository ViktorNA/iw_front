export const getNormalDateTime = (date) => {
  const addZero = (number) => {
    return number > 9 ? number : `0${number}`;
  };

  const newDate = new Date(date);
  return `${newDate.getFullYear()}-${addZero(newDate.getMonth() + 1)}-${addZero(
    newDate.getDate()
  )} ${addZero(newDate.getHours())}:${addZero(newDate.getMinutes())}`;
};
