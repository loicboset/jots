import { useUserPushSubscriptions } from "@/services/push_subscriptions";

import { ActivatePushNotification } from "./ActivatePushNotification"
import WeeklyPlanner from "./WeeklyPlanner";

const PushNotification = (): React.ReactElement => {
  // RQ
  const { data: userSubscriptions = [] } = useUserPushSubscriptions();

  // VARS
  const hasPushSubscription = userSubscriptions.length > 0;

  return (
    <div>
      <ActivatePushNotification />
      {hasPushSubscription && <WeeklyPlanner />}
    </div>
  )
}

export default PushNotification;