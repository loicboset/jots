export type UpsertPushSubscriptionPayload = {
  user_id: string;
  endpoint: string;
  auth: string;
  p256dh: string;
  browser: string;
  os: string;
};