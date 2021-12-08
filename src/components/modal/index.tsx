import { FC } from "react";
import { createPortal } from "react-dom";
import "./modal.css";

interface ModalProps {
  onClose?: () => void;
}

const Modal: FC<ModalProps> = (props) =>
  createPortal(
    <>
      <div className="overlay" />
      <div className="modal">
        <div className="modal-container">
          <div className="modal-body">
            {props.onClose && (
              <div className="modal-close" onClick={props.onClose} />
            )}
            {props.children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );

export default Modal;
