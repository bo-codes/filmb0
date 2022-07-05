import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CommentForm from './CommentForm';


function CreateCommentModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Write a Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CommentForm trigger={showModal} setTrigger={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CreateCommentModal;
