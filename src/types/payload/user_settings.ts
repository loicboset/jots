type UpsertUserSettings = {
  user_id: string;
  role?: string;
  experience?: number;
  goal?: string;
  mood_checks_enabled: boolean;
};

export type { UpsertUserSettings };
