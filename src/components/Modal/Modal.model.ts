export type TModal = {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  customRoot?: HTMLElement;
};
