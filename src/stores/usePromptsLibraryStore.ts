import { BaseSelection } from "lexical";
import { create } from "zustand";

type Store = {
  isOpen: boolean;
  toggle: () => void;
  selection: BaseSelection | null;
  setSelection: (selection: BaseSelection) => void;
};

const usePromptsLibraryStore = create<Store>((set) => ({
  isOpen: false,
  toggle: (): void => set((state) => ({ isOpen: !state.isOpen })),
  selection: null,
  setSelection: (selection: BaseSelection): void => set({ selection }),
}));

export default usePromptsLibraryStore;
