type UserSettings = {
  user_id: string;
  role?: string;
  experience?: number;
  goal?: string;
  timezone?: string;
  mood_checks_enabled: boolean;
  is_push_notifications_active: boolean;
};

export type { UserSettings };
