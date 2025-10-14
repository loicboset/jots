"use client";

import "./index.css";

import {
  useUpsertUserPushNotification,
  useUserPushNotifications,
} from "@/services/user_push_notifications";
import { useUserSettings } from "@/services/user_settings";
import useToast from "@/utils/hooks/useToast";

const weekDays = [
  { name: "Monday", short: "M", index: 1 },
  { name: "Tuesday", short: "T", index: 2 },
  { name: "Wednesday", short: "W", index: 3 },
  { name: "Thursday", short: "T", index: 4 },
  { name: "Friday", short: "F", index: 5 },
  { name: "Saturday", short: "S", index: 6 },
  { name: "Sunday", short: "S", index: 0 },
];

const getDaysFromCron = (cron: string): string[] => {
  const daysIndex = cron.split(" ")[4].split(",");
  const daysName: string[] = [];
  daysIndex.forEach((day) => {
    const name = weekDays.find((w) => w.index === Number(day))?.name;
    if (name) daysName.push(name);
  });

  return daysName;
};

const WeeklyPlanner = (): React.ReactElement => {
  // RQ
  const { data: userSettings } = useUserSettings();
  const { data: pushNotifications = [] } = useUserPushNotifications();
  const { mutate: upsertPushNotif, isPending } =
    useUpsertUserPushNotification();

  // HOOKS
  const [toast, setToast, clearToast] = useToast();

  // VARS
  const days: string[] = pushNotifications[0]
    ? getDaysFromCron(pushNotifications[0].cron_expression)
    : [];

  const minutes = pushNotifications[0]
    ? pushNotifications[0].cron_expression.split(" ")[0]
    : "00";
  const hours = pushNotifications[0]
    ? pushNotifications[0].cron_expression.split(" ")[1]
    : "18";
  const time = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

  // METHODS
  const handleDayChange = (day: string): void => {
    clearToast();
    let selectedDays = [...days];
    if (days.includes(day)) {
      selectedDays = days.filter((d) => d !== day);
    } else {
      selectedDays = [...days, day];
    }

    if (selectedDays.length === 0) {
      setToast({
        type: "info",
        message:
          "You must select at least one day. You can disable the functionality though.",
      });
      return;
    }

    const timezone = userSettings?.timezone || "UTC/UTC";
    upsertPushNotif({ days: selectedDays, time, timezone });
  };

  const handleTimeChange = (time: string): void => {
    clearToast();
    const timezone = userSettings?.timezone || "UTC/UTC";
    upsertPushNotif({ days, time, timezone });
  };

  return (
    <>
      {toast}

      <form className="flex justify-between items-center mt-4 flex-wrap">
        <div className="flex space-x-2">
          {weekDays.map((day) => (
            <span
              key={day.name}
              onClick={() => handleDayChange(day.name)}
              className={`
                inline-flex size-7 items-center justify-center rounded-full
                text-white border border-gray-50
                hover:bg-indigo-600  font-medium cursor-pointer
                ${days.includes(day.name) ? "bg-indigo-600" : "bg-gray-500"}
                ${isPending && "pointer-events-none opacity-50"}
              `}
            >
              <span className="text-xs font-medium text-white">
                {day.short}
              </span>
            </span>
          ))}
        </div>
        <input
          type="time"
          className="bg-gray-900 text-gray-50 text-xs px-2 py-1 border border-white rounded-2xl"
          value={time}
          onChange={(e) => handleTimeChange(e.target.value)}
        />
      </form>
    </>
  );
};

export default WeeklyPlanner;
