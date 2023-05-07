import { createPortal } from "react-dom";
import { FaRegTimesCircle, FaRegCheckCircle } from "react-icons/fa";
import Button from "../button/button.js";
import Overlay from "../overlay/overlay.js";
import "./modal.css"

const Modal = ({ open, children, onClose, header, icon, type }) => {
  if (!open) return null;

  let IconClass, iconStyle = "";
  icon === "error" ? Error() : Success();

  function Error() {
    IconClass = <FaRegTimesCircle />
    iconStyle = "times-circle";
  }

  function Success() {
    IconClass = <FaRegCheckCircle />
    iconStyle = "check-circle"
  }

  const root = document.body;

  const ModalTemplate = (
    <div data-testid="modal">
      <div className="modal">
        <span className={iconStyle}>{IconClass}</span>
        <div>
          <p className="msg">{header}</p>
          <p>{children}</p>
        </div>
        {
          type === "btn-on" &&
          < Button
            variant="primary"
            onClick={onClose}
            children="ok">
          </Button>
        }
      </div>
      <Overlay></Overlay>
    </div >
  )
  return createPortal(ModalTemplate, root);
}

export default Modal;
