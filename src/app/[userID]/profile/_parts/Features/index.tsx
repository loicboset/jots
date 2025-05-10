import MoodChecks from "../MoodChecks";
import PushNotification from "../PushNotifications";

const Features = (): React.ReactElement => {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
      <div>
        <h2 className="text-base/7 font-semibold text-white">Features</h2>
        <p className="mt-1 text-sm/6 text-gray-400">
          Customise your experience with these features.
        </p>
      </div>

      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
        <div className="sm:col-span-4">
          <MoodChecks />
        </div>
        <div className="sm:col-span-4">
          <PushNotification />
        </div>
      </div>
    </div>
  );
};

export default Features;
