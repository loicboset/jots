import urlBase64ToUnit8Array from "@/utils/url/urlBase64ToUnit8Array";

const getVapidKey = (): Uint8Array | null => {
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidPublicKey) return null;

  return urlBase64ToUnit8Array(vapidPublicKey);
};

const subscribePushNotification = async (): Promise<PushSubscription> => {
  const registration = await navigator.serviceWorker.ready;
  const subscriptionOptions = {
    userVisibleOnly: true,
    applicationServerKey: getVapidKey(),
  };

  const subscription = await registration.pushManager
    .subscribe(subscriptionOptions)
    .catch((error) => {
      console.error("Error subscribing to push notifications:", error);
      throw new Error("Failed to subscribe to push notifications");
    });
  return subscription;
};

export default subscribePushNotification;
