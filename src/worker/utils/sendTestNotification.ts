/*
 * This function sends a test notification to the given subscriptions.
 */

import { UserPushSubscription } from '@/types/api/push_subscriptions';

const sendTestNotifications = async (subscriptions: UserPushSubscription[]): Promise<void> => {
  await fetch('/api/notifications/send_test_push_notification', {
    method: 'POST',
    body: JSON.stringify({ subscriptions }),
    headers: { 'Content-type': 'application/json' },
  });
};

export default sendTestNotifications;
