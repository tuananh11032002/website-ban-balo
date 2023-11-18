import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MessageBox = forwardRef(({ onYesClick, onNoClick }, ref) => {
   const [showModal, setShowModal] = useState(false);

   const handleShow = () => setShowModal(true);
   const handleClose = () => setShowModal(false);

   const handleYesClick = () => {
      if (onYesClick) {
         onYesClick();
      }
      handleClose();
   };

   const handleNoClick = () => {
      if (onNoClick) {
         onNoClick();
      }
      handleClose();
   };

   useImperativeHandle(ref, () => ({
      show: handleShow,
   }));

   return (
      <div>
         <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to proceed?</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleNoClick}>
                  No
               </Button>
               <Button variant="primary" onClick={handleYesClick}>
                  Yes
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
});

export default MessageBox;
