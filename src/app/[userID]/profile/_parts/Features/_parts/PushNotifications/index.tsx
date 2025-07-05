import { useUserPushSubscriptions } from "@/services/push_subscriptions";

import { ActivatePushNotification } from "./ActivatePushNotification"
import UserTimezone from "./UserTimezone";
import WeeklyPlanner from "./WeeklyPlanner";

const PushNotification = (): React.ReactElement => {
  // RQ
  const { data: userSubscriptions = [] } = useUserPushSubscriptions();

  // VARS
  const hasPushSubscription = userSubscriptions.length > 0;

  return (
    <div>
      <ActivatePushNotification />
      {hasPushSubscription && (
        <>
          <WeeklyPlanner />
          <UserTimezone />
        </>
      )}

    </div>
  )
}

export default PushNotification;