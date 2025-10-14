/*
  * This hook is responsible for managing the push notifications.
  * It will check the service worker state and the push subscription.
  * It will also allow the user to subscribe to the push notifications and send test notifications.
  * It returns the service worker state, the push subscription, the subscribeDevice
  function, the isSubscribing state, the testDeviceNotification function, and the sendTestNotifications function.
*/

import { useCallback, useEffect, useState } from "react";

import { UAParser } from "ua-parser-js";

import { useUserContext } from "@/context/UserProvider";
import subscribePushNotification from "@/packages/PushNotifications/utils/subscribePushNotification";
import {
  useUserPushSubscriptions,
  useUpsertPushSubscription,
} from "@/services/push_subscriptions";
import { UserPushSubscription } from "@/types/api/push_subscriptions";
import sendTestNotifications from "@/worker/utils/sendTestNotification";

type ReturnUseSWManager = {
  swState: ServiceWorkerState | null;
  pushSubscription: PushSubscription | null;
  subscribeDevice: () => Promise<void>;
  isSubscribing: boolean;
  sendTestNotifications: (
    subscriptions: UserPushSubscription[],
  ) => Promise<void>;
};

const usePushNotificationsManager = (): ReturnUseSWManager => {
  // CONTEXT
  const { user } = useUserContext();

  // STATE
  const [swState, setSwState] = useState<ServiceWorkerState | null>(null);
  const [pushSubscription, setPushSubscription] =
    useState<PushSubscription | null>(null);

  // RQ
  const { data: userSubscriptions = [] } = useUserPushSubscriptions();
  const { mutate: createUserSubscription, isPending: isSubscribing } =
    useUpsertPushSubscription();

  // METHODS
  const subscribeDevice = useCallback(async (): Promise<void> => {
    const { browser, os } = new UAParser(navigator.userAgent).getResult();
    const subscription = await subscribePushNotification();

    const auth = subscription.toJSON().keys?.auth;
    const p256dh = subscription.toJSON().keys?.p256dh;
    if (!auth || !p256dh) return;

    createUserSubscription({
      user_id: user.userID,
      endpoint: subscription.endpoint,
      auth,
      p256dh,
      browser: browser.name || "unknown",
      os: os.name || "unknown",
    });
  }, [createUserSubscription, user.userID]);

  // EFFECT
  // Get the service worker registration and set the state
  useEffect(() => {
    navigator.serviceWorker
      .getRegistration("/")
      .then((registration) => {
        let serviceWorker;
        if (registration?.installing) {
          serviceWorker = registration.installing;
          serviceWorker.onstatechange = (e): void => {
            if (e.target) setSwState((e.target as ServiceWorker).state);
          };
          setSwState("installing");
        } else if (registration?.waiting) {
          serviceWorker = registration.waiting;
          setSwState("installed");
        } else if (registration?.active) {
          serviceWorker = registration.active;
          setSwState("activated");
        }

        registration?.addEventListener("updatefound", (e) => {
          const sw = e.currentTarget as ServiceWorkerRegistration;
          if (sw.active) setSwState("activated");
          if (sw.waiting) setSwState("installed");
          if (sw.installing) {
            sw.installing.onstatechange = (event): void => {
              if (event.target)
                setSwState((event.target as ServiceWorker).state);
            };
            setSwState("installing");
          }
        });
      })
      .catch((err) => {
        console.error("Error getting service worker registration:", err);
      });
  }, []);

  // Get the push subscription and set the state
  useEffect(() => {
    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      // Do we already have a push message subscription?
      // serviceWorkerRegistration.addEventListener('')
      serviceWorkerRegistration.pushManager
        .getSubscription()
        .then((subscription) => {
          setPushSubscription(subscription);
        })
        .catch((err) => {
          console.error(`Error during getSubscription(): ${err}`);
        });
    });
  }, [userSubscriptions]);

  return {
    swState,
    pushSubscription,
    subscribeDevice,
    isSubscribing,
    sendTestNotifications,
  };
};

export default usePushNotificationsManager;
