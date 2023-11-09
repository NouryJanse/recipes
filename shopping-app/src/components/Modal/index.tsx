import { useEffect, useRef } from "preact/hooks";
import type { FunctionComponent } from "preact";

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose: () => void;
  children: any;
}

const Modal: FunctionComponent<ModalProps> = ({ isOpen, hasCloseBtn = true, onClose, children }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape" || e.code === "Space") onClose();
  };

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
    <dialog ref={modalRef} className="modal" onKeyDown={handleKeyDown}>
      {hasCloseBtn && <button onClick={handleCloseModal}>Close</button>}
      {children}
    </dialog>
  );
};

export default Modal;
