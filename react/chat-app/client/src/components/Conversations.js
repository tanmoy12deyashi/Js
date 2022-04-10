// import react
import React from 'react';
// import bootsatrap component
import { ListGroup } from 'react-bootstrap';
// import conversations provider
import { useConversations } from '../contexts/ConversationsProvider';

// export conversations components
export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  // return list group
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map(r => r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
