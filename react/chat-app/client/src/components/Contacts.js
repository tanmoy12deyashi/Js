// import react
import React from 'react';
// import bootsatrap component
import { ListGroup } from 'react-bootstrap';
// import contacts provider
import { useContacts } from '../contexts/ContactsProvider';

// export contacts components
export default function Contacts() {
  // get contacts
  const { contacts } = useContacts();

  // get contact lists
  const contactLists = contacts.map(contact => (
    <ListGroup.Item key={contact.id}>
      {contact.name}
    </ListGroup.Item>
  ))

  // return components
  return (
    <ListGroup variant="flush">
      {contactLists}
    </ListGroup>
  );
}
