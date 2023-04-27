import { DropdownProps } from './types';

export const mockDropdownProps: DropdownProps = {
  children: (
    <ul className="menu">
      <li className="menu-item">
        <button>Menu 1</button>
      </li>
      <li className="menu-item">
        <button>Menu 2</button>
      </li>
    </ul>
  ),
  button: <div className="border">Show content</div>,
};
