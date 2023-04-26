import * as React from 'react';
import { DropdownProps } from './types';

export const Dropdown = React.forwardRef((props: DropdownProps, ref) => {
  const { button, children } = props;
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
      }
    };

    document.addEventListener('mousedown', (e) => {
      closeOpenMenus(e);
    });
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown" ref={dropdown}>
      <button onClick={handleOpen} className="mb-[10px]">
        {button}
      </button>
      {open ? (
        <div className="bg-neutral-white shadow-md">{children}</div>
      ) : null}
    </div>
  );
});
