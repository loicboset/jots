/**
 * Formats a date into a string (e.g. Friday, January 5, 2024).
 */
const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatDate = (inputDate: Date): string => {
  const month = inputDate.toLocaleString("default", { month: "long" });
  const day = inputDate.getDay();
  const date = inputDate.getDate();
  const year = inputDate.getFullYear();
  return `${DAY_NAMES[day]}, ${month} ${date}, ${year}`;
};

export default formatDate;
