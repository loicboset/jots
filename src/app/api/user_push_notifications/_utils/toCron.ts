const dayMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;

const toCron = (days: string[], time: string): string => {
  const [hour, minute] = time.split(':').map(Number);
  const cronDays = days.map((d) => dayMap[d as keyof typeof dayMap]).join(',');
  return `${minute} ${hour} * * ${cronDays}`;
};

export default toCron;
