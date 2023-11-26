import { useEffect, useRef } from "preact/hooks";
import type { FunctionComponent } from "preact";

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose: () => void;
  children: any;
  title: string;
}

const Modal: FunctionComponent<ModalProps> = ({ isOpen, hasCloseBtn = true, onClose, children, title }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isOpen) {
        return modalElement.showModal();
      }
      return modalElement.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      className="modal"
      onKeyDown={(e: KeyboardEvent) => {
        if (e.code === "Escape") onClose();
      }}
    >
      <div>
        {title ? <h2>{title}</h2> : ""}

        {hasCloseBtn && <button onClick={() => onClose()}>Close</button>}
      </div>

      {children}
    </dialog>
  );
};

export default Modal;
