// import react and hooks
import React, { useState, useCallback } from 'react';
// import bootstrap components
import { Form, InputGroup, Button } from 'react-bootstrap';
// import concersations proivider
import { useConversations } from '../contexts/ConversationsProvider';

// export open comversation component
export default function OpenConversation() {
  // set state
  const [text, setText] = useState('');

  // use callback
  const setRef = useCallback(node => {
    // if node exist
    if (node) {
      // scroll
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  // use conversation context
  const { sendMessage, selectedConversation } = useConversations();

  // handle form submit [send message]
  function handleSubmit(e) {
    // prevent default action
    e.preventDefault();

    console.log(text, selectedConversation, selectedConversation.recipients.map(r => r.id))
    // send message
    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text,
      new Date().toLocaleTimeString()
    );

    // clear message after send
    setText('');
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
                </div>
                <div
                  className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  <i>{message.time}</i>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
