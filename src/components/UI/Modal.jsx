import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Modal = ({ open, onClose, children }) => {
  const dialogRef = useRef();

  useEffect(() => {
    const ref = dialogRef.current;
    if (open) {
      ref.showModal();
    } else {
      ref.close();
    }

    const handleBackdropClick = (event) => {
      if (event.target === ref) {
        onClose?.();
      }
    };

    ref.addEventListener("click", handleBackdropClick);
    return () => {
      ref.removeEventListener("click", handleBackdropClick);
      ref.close();
    };
  }, [open, onClose]);

  return createPortal(
    <motion.dialog
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      ref={dialogRef}
      className="backdrop:bg-neutral-700 backdrop:bg-opacity-30 bg-white rounded-xl"
    >
      {children}
    </motion.dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
