export interface DropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  onChange?: (isOpen: boolean) => void;
}
