import { createPortal } from "react-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import Overlay from "../overlay/overlay.js";
import "./modal.css"

const Modal = ({ open, children, header }) => {
  if (!open) return null;

  const root = document.body;

  const ModalTemplate = (
    <div data-testid="modal">
      <div className="modal">
        <span className="times-circle"><FaRegCheckCircle /></span>
        <div>
          <p className="msg">{header}</p>
          <p>{children}</p>
        </div>
      </div>
      <Overlay></Overlay>
    </div >
  )
  return createPortal(ModalTemplate, root);
}

export default Modal;
