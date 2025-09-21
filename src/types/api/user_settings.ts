type UserSettings = {
  user_id: string;
  role?: string;
  experience?: number;
  goal?: string;
  timezone?: string;
  mood_checks_enabled: boolean;
  daily_prompt_enabled: boolean;
  is_push_notifications_active: boolean;
  career_coach_mode: string | null;
  github_token_encrypted: string | null;
};

export type { UserSettings };
