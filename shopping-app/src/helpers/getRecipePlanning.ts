export const getRecipePlanning = () => {
  let arr = [];

  for (let index = -4; index < 0; index++) {
    arr.push({
      date: getDays(new Date(), index).toLocaleDateString("nl-NL"),
    });
  }
  for (let index = 0; index < 10; index++) {
    arr.push({
      date: getDays(new Date(), index).toLocaleDateString("nl-NL"),
    });
  }
  return arr;
};
const getDays = (currentDate = new Date(), daysToAdd = 1) => {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + daysToAdd);
  return nextDate;
};
