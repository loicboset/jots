type UpsertUserSettings = {
  user_id: string;
  role?: string;
  experience?: number;
  goal?: string;
  timezone?: string;
  mood_checks_enabled: boolean;
};

type EditUserTimezone = {
  timezone: string;
};

export type { UpsertUserSettings, EditUserTimezone };
