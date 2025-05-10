type UserPushSubscription = {
  id: number;
  user_id: number;
  endpoint: string;
  p256dh: string;
  auth: string;
  browser: string;
  os: string;
};

export type { UserPushSubscription };
