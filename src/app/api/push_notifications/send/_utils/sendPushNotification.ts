import webPush from 'web-push';

webPush.setVapidDetails(
  process.env.ENV_URL as string,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
  process.env.VAPID_PRIVATE_KEY as string,
);

type Args = {
  subscription: {
    endpoint: string;
    keys: {
      auth: string;
      p256dh: string;
    };
  };
};

const sendPushNotification = async (args: Args): Promise<void> => {
  // ARGS
  const { subscription } = args;

  // VARS

  const payload = JSON.stringify({ title: "Jots - it's time to journal!" });

  try {
    await webPush.sendNotification(subscription, payload);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};

export default sendPushNotification;
