import { useCallback, useState } from "react";

type UseModalContentReturn = [
  isOpen: boolean,
  toggle: () => void,
  setIsOpen: (isOpen: boolean) => void,
];

const useModalContent = (): UseModalContentReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback((): void => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return [isOpen, toggle, setIsOpen];
};

export default useModalContent;
