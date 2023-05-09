import * as React from 'react';
import { DropdownProps } from './types';

export const Dropdown = React.forwardRef((props: DropdownProps, ref) => {
  const { button, children, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const dropdown = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const closeOpenMenus = (e: MouseEvent) => {
      if (
        dropdown &&
        dropdown.current &&
        !dropdown.current.contains(e.target as Node)
      ) {
        setOpen(false);
        if (onChange) onChange(false);
      }
    };

    document.addEventListener('mousedown', (e) => {
      closeOpenMenus(e);
    });
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    if (onChange) onChange(!open);
  };

  return (
    <div className="dropdown relative flex" ref={dropdown}>
      <button onClick={handleOpen} className="">
        {button}
      </button>
      {open ? (
        <div className="bg-neutral-white shadow-md absolute top-10">
          {children}
        </div>
      ) : null}
    </div>
  );
});
