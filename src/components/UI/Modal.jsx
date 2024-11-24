import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  return createPortal(
    <dialog className="backdrop:bg-neutral-700 backdrop:bg-opacity-40">
      {children}
    </dialog>,
    document.getElementById("#modal")
  );
};

export default Modal;
