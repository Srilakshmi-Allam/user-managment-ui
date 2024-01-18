// GenericModal.jsx
import React, { useState } from "react";
import Modal from "react-modal";

const GenericModal = ({
  isOpen,
  onRequestClose,
  onSubmit,
  title,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleModalSubmit = () => {
    onSubmit(inputValue);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={`${title} Modal`}
      className="modal-dialog modal-dialog-centered"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{`Enter ${title}`}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onRequestClose}
          ></button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="form-control"
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onRequestClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleModalSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GenericModal;
