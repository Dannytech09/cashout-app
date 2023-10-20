import React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#__next');

const customStyles = {
  content : {
    top                   : '10%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  },
  overlay : {
    backgroundColor   : 'rgba(0, 0, 0, 0.5)',
    zIndex : '50',
  }
};

const ConfirmDataGiftModal = ({ phoneNumber, dataVol, network, modalIsOpen, onRequestClose, onConfirm, children }) => {
  return (
    <Modal appElement={typeof window !== 'undefined' ? document.getElementById('__next') : null}
    isOpen={modalIsOpen} onRequestClose={onRequestClose} style={customStyles}>
    <div className='p-6'>
      <h2 className='text-1xl'>You are about to purchase {network} {dataVol} to {phoneNumber}</h2>
      <div className='text-center mt-10 flex justify-around'>
      <button className='text-green-600 font-bold' onClick={onConfirm}>Confirm</button>
      <button className='text-red-600 font-bold' onClick={onRequestClose}>Cancel</button>
      </div>
      </div>
      {children}
    </Modal>
  );
};

export default ConfirmDataGiftModal;
