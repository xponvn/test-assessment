import { useContext } from 'react';
import { ModalContext } from '../layout';

export interface ModalProps {
  title?: string;
  content?: string | React.ReactNode;
  actions?: React.ReactNode;
}

const Modal = () => {
  const {
    modalState: { title, content, actions },
  } = useContext(ModalContext);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-20 max-w-[460px]">
      <div className="py-4 px-6 bg-neutral-table-header">
        <p className="text-subhead-1 font-medium">{title}</p>
      </div>
      <hr className="border-neutral-divider" />
      <div className="px-6 py-5">
        {typeof content === 'string' ? (
          <p className="leading-20 text-15">{content}</p>
        ) : (
          content
        )}
        {actions}
      </div>
    </div>
  );
};

export default Modal;
