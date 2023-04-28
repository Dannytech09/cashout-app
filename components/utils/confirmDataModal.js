import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#__next');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  },
  overlay : {
    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  }
};

const ConfirmDataModal = ({ network, dataVol, phoneNumber, modalIsOpen, onRequestClose, onConfirm, children }) => {
  return (
    <Modal appElement={typeof window !== 'undefined' ? document.getElementById('__next') : null}
    isOpen={modalIsOpen} onRequestClose={onRequestClose} style={customStyles}>
      <h2>You are about to purchase {dataVol} {network} to {phoneNumber}</h2>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onRequestClose}>Cancel</button>
      {children}
    </Modal>
  );
};

export default ConfirmDataModal;
