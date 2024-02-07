import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#__next");

const customStyles = {
  content: {
    top: "25%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "50",
  },
};

const ConfirmResolveModal = ({
  modalIsOpen,
  onRequestClose,
  onConfirm,
  message,
  amount,
  email,
  children,
}) => {
  return (
    <Modal
      appElement={
        typeof window !== "undefined" ? document.getElementById("__next") : null
      }
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className="p-6">
        {message && (
          <p className="border p-2 mb-2 text-sm bg-red-500 rounded-md text-slate-100 text-center">
            {message}
          </p>
        )}
        <hr />
        <hr />
        <br />
        <h2 className="text-[1.2ch] text-center">
          You are about to debit {email && email} the sum of {"\u20A6"} {amount && amount}.{" "}
          <em>if STATUS is failed user will be debited</em> otherwise{" "}
          <em>if STATUS is processing or completed it will update status</em>
        </h2>
        <div className="text-center mt-10 flex justify-around">
          <button className="text-green-600 font-bold" onClick={onConfirm}>
            Confirm
          </button>
          <button className="text-red-600 font-bold" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </div>
      {children}
    </Modal>
  );
};

export default ConfirmResolveModal;
