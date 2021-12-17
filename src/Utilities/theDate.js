export let currentDate = new Date();
export let current_day = currentDate.getDate();
export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export let current_year = currentDate.getFullYear();
export let theDate =
  days[currentDate.getDay()] +
  " " +
  current_day +
  " " +
  months[currentDate.getMonth()] +
  " " +
  current_year +
  " " +
  currentDate.getHours() +
  ":" +
  currentDate.getMinutes();
