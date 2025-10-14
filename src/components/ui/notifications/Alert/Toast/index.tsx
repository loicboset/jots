/* eslint-disable max-len */
import React, { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";

export type ToastProps = {
  type?: "warning" | "danger" | "info" | "success" | string;
  message?: string | React.ReactElement;
  close: () => void;
  show: boolean;
};

const Toast = ({
  type = "success",
  message,
  close,
  show,
}: ToastProps): React.ReactElement => {
  // VARS
  let icon, title;

  switch (type) {
    case "warning":
      icon = (
        <ExclamationTriangleIcon
          className="w-6 h-6 text-yellow-400"
          aria-hidden="true"
        />
      );
      title = "Pay attention";
      break;
    case "danger":
      icon = (
        <XCircleIcon className="w-6 h-6 text-red-400" aria-hidden="true" />
      );
      title = "Something went wrong!";
      break;
    case "info":
      icon = (
        <InformationCircleIcon
          className="w-6 h-6 text-blue-400"
          aria-hidden="true"
        />
      );
      title = "FYI";
      break;
    case "success":
      icon = (
        <CheckCircleIcon
          className="w-6 h-6 text-green-400"
          aria-hidden="true"
        />
      );
      title = "Success!";
      break;
    default:
      break;
  }

  return (
    <Dialog open={true} onClose={close}>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        // z-[41] to make sure the toast is above the slideover
        className="fixed inset-0 z-[41] flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">{icon}</div>

                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <div className="mt-1 text-sm text-gray-500 break-words">
                      {message}
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={close}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Dialog>
  );
};

export default Toast;
