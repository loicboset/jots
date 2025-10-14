/* eslint-disable max-len */
import { Fragment } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

type Props = {
  open: boolean;
  toggle: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "lg" | "xl" | "2xl";
  overlayCanClose?: boolean;
  isOverflowing?: boolean;
};

const Modal = (props: Props): React.ReactElement => {
  // PROPS
  const {
    open,
    toggle,
    children,
    title,
    size = "sm",
    overlayCanClose = true,
    isOverflowing = false,
  } = props;

  // VARS
  const modalSize = {
    sm: "sm:max-w-sm",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  };

  return (
    <>
      <Transition show={open} as={Fragment}>
        <Dialog
          open={open}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={toggle}
        >
          <div className="flex items-end justify-center px-4 pt-4 pb-20 text-center md:min-h-dvh sm:block sm:p-0">
            <DialogBackdrop
              onClick={toggle}
              className={classNames(
                "fixed inset-0 bg-gray-500 opacity-75",
                !overlayCanClose && "pointer-events-none",
              )}
            />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-dvh"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={classNames(
                  "relative inline-block px-4 pt-5 pb-4 text-left align-bottom transition-all transform bg-gray-900 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:w-full sm:p-6",
                  modalSize[size],
                  !isOverflowing && "overflow-hidden",
                )}
              >
                {title && (
                  <>
                    <DialogTitle
                      as="h3"
                      className="mb-6 text-base font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </DialogTitle>
                    <div className="absolute top-0 right-0 hidden pt-6 pr-4 sm:block">
                      <button
                        type="button"
                        className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={toggle}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                      </button>
                    </div>
                  </>
                )}
                {children}
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
