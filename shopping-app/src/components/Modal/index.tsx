import { useEffect, useRef } from "preact/hooks";
import type { FunctionComponent } from "preact";
import Button from "../Form/Button";

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose: () => void;
  children: any;
  title: string;
  onSubmit?: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ isOpen, hasCloseBtn = true, onClose, children, title, onSubmit }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) return modalRef.current.showModal();
      return modalRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      className="modal"
      onKeyDown={(e: KeyboardEvent) => {
        if (e.code === "Escape") onClose();
        if (e.code === "Enter" && onSubmit) onSubmit();
      }}
    >
      <div>
        {title ? <h2>{title}</h2> : ""}

        {hasCloseBtn && <Button type="submit" style="tertiary" onClick={onClose} children="Close" />}
      </div>

      {children}
    </dialog>
  );
};

export default Modal;
