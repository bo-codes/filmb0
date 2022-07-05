import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ImageForm from './ImageForm';


function CreateImageModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} style={{fontSize: '28px', borderRadius: '8px', paddingLeft: '4px', paddingRight: '4px', margin: '10px'}}>new post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ImageForm trigger={showModal} setTrigger={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateImageModal;
