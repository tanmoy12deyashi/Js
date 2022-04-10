// import react and hooks
import React, { useContext, useState, useEffect, useCallback } from 'react';
// import useLocalStorage hooks
import useLocalStorage from '../hooks/useLocalStorage';
// import useContacts
import { useContacts } from './ContactsProvider';
// import useSocket
import { useSocket } from './SocketProvider';

// create context
const ConversationsContext = React.createContext();

// export useConversations
export function useConversations() {
  // return context
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  // set state for conversation
  const [conversations, setConversations] = useLocalStorage('conversations', []);

  // set current conversation state
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  
  // get contacts context
  const { contacts } = useContacts();

  // get socket context
  const socket = useSocket();

  // define createConversation
  function createConversation(recipients) {
    // set conversation [change state]
    setConversations(prevConversations => {
      // return conversations
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  // define addMessageToConversation
  const addMessageToConversation = useCallback(({ recipients, text, sender, time }) => {
    // set conversations
    setConversations(prevConversations => {
      // set local variable
      let madeChange = false;
      // set message
      const newMessage = { sender, text, time };

      // update new conversation
      const newConversations = prevConversations.map(conversation => {
        // check array
        if (arrayEquality(conversation.recipients, recipients)) {
          // update local variable
          madeChange = true;
          // return new data
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          };
        }

        // return default data
        return conversation;
      });

      // if change
      if (madeChange) {
        return newConversations;
      } else {
        return [
          ...prevConversations,
          { recipients, messages: [newMessage] }
        ];
      }
    });
  }, [setConversations]);

  // set useEffect hooks
  useEffect(() => {
    // check socket object
    if (socket == null) return;

    // if message received
    socket.on('receive-message', addMessageToConversation);

    // socket off
    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  // define sendMessage
  function sendMessage(recipients, text, time) {
    // emit socket
    socket.emit('send-message', { recipients, text, time });

    // call addMessageToConversation
    addMessageToConversation({ recipients, text, sender: id, time });
  }

  // define formattedConversations
  const formattedConversations = conversations.map((conversation, index) => {
    // get recipients
    const recipients = conversation.recipients.map(recipient => {
      // get contact
      const contact = contacts.find(contact => {
        return contact.id === recipient;
      });

      // get name
      const name = (contact && contact.name) || recipient;

      // return recipients details
      return { id: recipient, name };
    });

    // get message
    const messages = conversation.messages.map(message => {
      // get contact
      const contact = contacts.find(contact => {
        return contact.id === message.sender;
      });

      // get name
      const name = (contact && contact.name) || message.sender;

      // if sended by me
      const fromMe = id === message.sender;

      // return updated message
      return { ...message, senderName: name, fromMe };
    });
    
    // get selected conversation user
    const selected = index === selectedConversationIndex;
    
    // return updated message
    return { ...conversation, messages, recipients, selected };
  });

  // define value
  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation
  }

  // return ConversationsContext Provider
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

// check array
function arrayEquality(a, b) {
  // check length
  if (a.length !== b.length) return false;

  // sort array
  a.sort();
  b.sort();

  // return true if same
  return a.every((element, index) => {
    return element === b[index]
  });
}