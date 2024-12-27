import React from "react";
import ReactDOM from "react-dom";
import "@/styles/_custom-modal.scss";
import { X } from "react-bootstrap-icons";

export default function CustomModal({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="custom-modal position-fixed top-0 start-0 bottom-0 end-0 d-flex justify-content-center align-items-center z-3">
      <div
        className="position-absolute w-100 h-100 bg-secondary bg-opacity-75 z-n1"
        onClick={onClose}
      />
      <div className="custom-modal__wrap position-relative bg-white rounded-3 shadow-lg animate__animated animate__fadeInUp animate__faster">
        <div
          className="custom-modal__close position-absolute top-0 start-100 d-flex align-items-center justify-content-center bg-white rounded-circle shadow"
          role="button"
          onClick={onClose}
        >
          <X className="text-secondary" size={20} />
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
