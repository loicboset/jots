import { useCallback } from 'react';

import { UAParser } from 'ua-parser-js';

import { useUserContext } from '@/context/UserProvider';
import { useUpsertPushSubscription } from '@/services/push_subscriptions';

import subscribePushNotification from '../utils/subscribePushNotification';

type UseUpsertPushSubscriptionReturn = {
  subscribeDevice: () => Promise<void>;
};

const useSubscribeDevice = (): UseUpsertPushSubscriptionReturn => {
  // CONTEXT
  const { user } = useUserContext();

  // RQ
  const { mutate: createUserSubscription } = useUpsertPushSubscription();

  // METHODS
  const subscribeDevice = useCallback(async (): Promise<void> => {
    const { browser, os } = new UAParser(navigator.userAgent).getResult();
    const subscription = await subscribePushNotification();

    const auth = subscription.toJSON().keys?.auth;
    const p256dh = subscription.toJSON().keys?.p256dh;
    if (!auth || !p256dh) return;

    createUserSubscription({
      user_id: user?.userID,
      endpoint: subscription.endpoint,
      auth,
      p256dh,
      browser: browser.name || 'unknown',
      os: os.name || 'unknown',
    });
  }, [createUserSubscription, user?.userID]);

  return { subscribeDevice };
};

export default useSubscribeDevice;
