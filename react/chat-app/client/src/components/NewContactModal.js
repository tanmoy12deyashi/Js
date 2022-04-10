// import react and hooks
import React, { useRef } from 'react';
// import bootstrap components
import { Modal, Form, Button } from 'react-bootstrap';
// import contact provider
import { useContacts } from '../contexts/ContactsProvider';

// export NewContactModal component
export default function NewContactModal({ closeModal }) {
  // use ref hooks
  const idRef = useRef();
  const nameRef = useRef();

  // get create contact function
  const { createContact } = useContacts();

  // handle submit
  function handleSubmit(e) {
    // prevent default action
    e.preventDefault();

    // create contact
    createContact(idRef.current.value, nameRef.current.value);

    // close modal
    closeModal();
  }

  // return new contact modal
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
