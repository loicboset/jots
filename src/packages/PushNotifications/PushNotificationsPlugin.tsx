import { useEffect } from "react";

 import { InformationCircleIcon } from "@heroicons/react/24/outline";
 import { useFeatureFlag } from "configcat-react";

 import Button from "@/components/ui/buttons/Button";
 import Modal from "@/components/ui/modals/Modal"
 import useModalContent from "@/utils/hooks/useModalContent";

 import useSubscribeDevice from "./logic/useSubscribeDevice";
 import subscribePushNotification from "./utils/subscribePushNotification";

 const PushNotificationsPlugin = (): React.ReactElement | null => {

   // HOOKS
   const { subscribeDevice } = useSubscribeDevice();
   const [isOpen, toggle] = useModalContent();

   // EFFECTS
   useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager.getSubscription().then(async (sub) => {
          if (!sub) {
            await subscribePushNotification();
          }
        });
      });
    }
   }, []);

  const { value: ispushnotificationenabledValue, loading: ispushnotificationenabledLoading } = useFeatureFlag("ispushnotificationenabled", false);
   if (!ispushnotificationenabledValue || ispushnotificationenabledLoading) return null;

   return (
     <Modal open={isOpen} toggle={toggle}>
       <div className="flex items-center space-x-2">
         <InformationCircleIcon className="w-6 text-blue-500" />
         <p className="text-lg font-medium leading-6 text-gray-900">Enable notifications!</p>
       </div>
       <p className="mt-2 text-sm text-gray-500">
         Receive your daily reminder directly on your device.
       </p>
       <div className="flex items-center justify-between mt-4 space-x-2">
         <Button color="white">Not yet</Button>
         <Button color="indigo" onClick={subscribeDevice}>
           Enable notifications
         </Button>
       </div>
     </Modal>
   );
 };

 export default PushNotificationsPlugin;