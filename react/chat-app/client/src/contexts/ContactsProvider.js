// import react and hooks
import React, { useContext } from 'react';
// import localstorage hooks
import useLocalStorage from '../hooks/useLocalStorage';

// create react context
const ContactsContext = React.createContext();

// export useContacts function
export function useContacts() {
  // return context
  return useContext(ContactsContext);
}

// export ContactsProvider component
export function ContactsProvider({ children }) {
  // use local storage hooks
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  // define create contact function
  function createContact(id, name) {
    // set contact to the local storage
    setContacts(prevContacts => {
      // return contact list
      return [...prevContacts, { id, name }]
    });
  }

  // return contact context provider
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
