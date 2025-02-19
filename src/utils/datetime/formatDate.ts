/**
 * Formats a date into a string (e.g. January 5, 2024).
 */
const formatDate = (date: Date): string => {
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

export default formatDate;
