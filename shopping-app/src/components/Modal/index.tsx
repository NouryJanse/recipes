import { useEffect, useRef } from "preact/hooks";
import type { FunctionComponent } from "preact";

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose: () => void;
  children: any;
  isEditing: boolean;
  title: string;
}

const Modal: FunctionComponent<ModalProps> = ({ isOpen, hasCloseBtn = true, onClose, children, title }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape") onClose();
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
      <div>
        {title ? <h2>{title}</h2> : ""}
        {hasCloseBtn && <button onClick={handleCloseModal}>Close</button>}
      </div>
      {children}
    </dialog>
  );
};

export default Modal;
