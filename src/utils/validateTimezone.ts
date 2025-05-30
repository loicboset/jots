import { timezones } from "@/timezones-supported";

const validateTimezone = (timezone: string): string => {
  const isValidTimezone = timezones.includes(timezone);
  if (isValidTimezone) return timezone;
  else return "UTC";
};

export default validateTimezone;
