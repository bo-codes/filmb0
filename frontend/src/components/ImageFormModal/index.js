import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageForm from './ImageForm';


function CreateImageModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="createBeachBttn" onClick={() => setShowModal(true)}>+</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ImageForm trigger={showModal} setTrigger={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateImageModal;
