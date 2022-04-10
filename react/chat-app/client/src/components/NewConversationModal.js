// import react and hooks
import React, { useState } from 'react';
// import bootstrap components
import { Modal, Form, Button } from 'react-bootstrap';
// import contact provider
import { useContacts } from '../contexts/ContactsProvider';
// import conversations provider
import { useConversations } from '../contexts/ConversationsProvider'

// export NewConversationModal component
export default function NewConversationModal({ closeModal }) {
  // set state
  const [selectedContactIds, setSelectedContactIds] = useState([]);

  // get contacts from local storage
  const { contacts } = useContacts();

  // get create conversation function
  const { createConversation } = useConversations();

  // handle form submit
  function handleSubmit(e) {
    // prevent default action
    e.preventDefault();

    // create concersation
    createConversation(selectedContactIds);

    // close modal
    closeModal();
  }

  // handle checkbox
  function handleCheckboxChange(contactId) {
    // update selected contact ids state
    setSelectedContactIds(prevSelectedContactIds => {
      // check prev id
      if (prevSelectedContactIds.includes(contactId)) {
        // filter previous ids
        return prevSelectedContactIds.filter(prevId => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  }

  // return new conversation modal
  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit" className={`${selectedContactIds.length ? '' : 'd-none'}`}>Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
