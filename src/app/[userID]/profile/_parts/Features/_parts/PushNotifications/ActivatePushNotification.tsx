import { useEffect, useState } from 'react'

import Toggle from '@/components/ui/Toggle';
import InfoTooltip from '@/components/ui/tooltips/InfoTooltip';
import { useToggleCronJob } from '@/services/easycron';
import { useUserPushSubscriptions } from '@/services/push_subscriptions';
import { useUserPushNotifications } from '@/services/user_push_notifications';
import { useTogglePushNotification, useUserSettings } from '@/services/user_settings';

import usePushNotificationsManager from './usePushNotificationManager';

export const ActivatePushNotification = (): React.ReactElement | null => {
  // STATE
  const [permission, setPermission] = useState<NotificationPermission | null>(null);

  // RQ
  const { data: userSettings } = useUserSettings();
  const { data: userSubscriptions = [] } = useUserPushSubscriptions();
  const { data: pushNotifications = [] } = useUserPushNotifications();
  const { mutate: togglePushNotification } = useTogglePushNotification(); // this could use some description)
  const { mutate: toggleCronJob } = useToggleCronJob(); // this could use some description)


  // HOOKS
  const { subscribeDevice } = usePushNotificationsManager();

  // EFFECTS
  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // METHODS
  const handleTogglePushNotif = async (isActive: boolean): Promise<void> => {
    if (!("Notification" in window)) {
      alert("This browser does not support push notification");
      return;
    }
    if (permission === 'denied') {
      return alert('You have denied notifications. Please enable them in your browser settings.');
    }

    Notification.requestPermission().then((perm) => {
      if (perm === 'granted') {
        if (userSubscriptions.length > 0) {
          // User already has a subscription, we can toggle the push notification
          togglePushNotification(isActive);
          const existingCronJob = pushNotifications[0];
          if (existingCronJob) toggleCronJob({ easycronID: existingCronJob.cronjob_id, isActive });

        } else {
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(async (registration) => {
              const sub = await registration.pushManager.getSubscription();
              if (sub) await sub.unsubscribe();
              await subscribeDevice();
              togglePushNotification(isActive);
              const existingCronJob = pushNotifications[0];
              if (existingCronJob) toggleCronJob({ easycronID: existingCronJob.cronjob_id, isActive });
            });
          }
        }
      }
    });
  };

  if (permission === 'denied') {
    return (
      <p className="text-sm text-purple-600 sm:text-base">Notification permission denied. You can grant permissions from your browser settings.</p>
    );
  }

  return (
    <div className='flex justify-between max-w-2xl'>
      <div className='flex'>
        <span className="block text-sm/6 font-medium text-white">
          Reminders
        </span>
        <InfoTooltip message='Never forget to journal by receiving reminders at the time that suits you best.' />
      </div>
      <Toggle enabled={!!userSettings?.is_push_notifications_active} onChange={handleTogglePushNotif} />
    </div>
  );
}
