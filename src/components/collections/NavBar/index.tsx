'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

import NavbarContent from './parts/NavbarContent';

type Props = {
  sidebarOpen: boolean;
  handleSetSidebarOpen: (open: boolean) => void;
};

const bgColor = "rgb(40 40 40)";

const NavBar = ({ sidebarOpen, handleSetSidebarOpen }: Props): React.ReactElement => {
  return (
    <>
      <div className="md:hidden">
        <Dialog open={sidebarOpen} onClose={handleSetSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-[350px] flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <div className="flex h-screen flex-col gap-y-5 overflow-y-auto px-4 pb-4" style={{ backgroundColor: bgColor }}>
                <NavbarContent handleSetSidebarOpen={handleSetSidebarOpen} />
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
      <div
        className="hidden p-4 m-4 rounded-2xl md:flex flex-col overflow-y-scroll"
        style={{ backgroundColor: bgColor }}
      >
        <NavbarContent />
      </div>
    </>
  );
};

export default NavBar;
