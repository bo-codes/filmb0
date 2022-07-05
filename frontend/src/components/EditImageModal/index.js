import React, { useState } from "react";
import { EditModal } from "../../context/EditModal";
import EditForm from "./EditForm";

function EditFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        edit
      </button>
      {showModal && (
        <EditModal onClose={() => setShowModal(false)}>
          <EditForm trigger={showModal} setTrigger={setShowModal} id='editForm'/>
        </EditModal>
      )}
    </>
  );
}

export default EditFormModal;
