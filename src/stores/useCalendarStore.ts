import { create } from 'zustand';

type Store = {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date) => void;
};

const useCalendarStore = create<Store>((set) => ({
  selectedDate: undefined,
  setSelectedDate: (date: Date): void => set({ selectedDate: date }),
}));

export default useCalendarStore;
