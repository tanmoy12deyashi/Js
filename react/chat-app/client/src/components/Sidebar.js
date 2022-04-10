// import react and hooks
import React, { useState, useEffect } from 'react';
// import bootstrap component
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
// import Conversations component
import Conversations from './Conversations';
// import Contacts component
import Contacts from './Contacts';
// import NewContactModal component
import NewContactModal from './NewContactModal';
// import NewConversationModal component
import NewConversationModal from './NewConversationModal';

// set constant key
const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

// export sidebar component
export default function Sidebar({ id, setLoader }) {
  // set CONVERSATIONS_KEY state
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  // set modal state
  const [modalOpen, setModalOpen] = useState(false);

  // set active tab
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  // set time state
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // set copy to clipbaord text state
  const [clipbaordText, setClipboardText] = useState("Copy ID to Clipboard");

  // use effect hooks
  useEffect(() => {
    // set interval for 1 second
    setInterval(() => {
      // update state value
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  });
  
  // close modal
  function closeModal() {
    // set modal state false
    setModalOpen(false);
  }

  // delete all
  function clearLocalStorage() {
    // remove from local storage
    localStorage.removeItem("tmd-chat-app-id");
    localStorage.removeItem(`tmd-chat-app-${CONVERSATIONS_KEY}`);
    localStorage.removeItem(`tmd-chat-app-${CONTACTS_KEY}`);
    // reload page
    window.location.reload(false);
    //setLoader(false)
    //setLoader(true)
  }

  function Logout() {
    // remove from local storage
    //localStorage.removeItem("tmd-chat-app-isReady");
    // reload page
    //window.location.reload(false);
    setLoader(false)
  }

  function copyToClipbaord(e) {
    // prevent default action
    e.preventDefault();
    
    // create text element
    const textElement = document.createElement("textarea");
    textElement.value = id;
    textElement.setAttribute("readonly", "");
    textElement.style.position = "absolute";
    textElement.style.left = "-9999px";

    // append element to body
    document.body.appendChild(textElement);
    // select text element
    textElement.select();
    // select by range
    textElement.setSelectionRange(0, 99999);
    // copy command execute
    document.execCommand("copy");
    // remove child
    document.body.removeChild(textElement);

    // update text
    setClipboardText("ID Copied");

    // update after 3 seconds
    setTimeout(() => {
      // update text
      setClipboardText("Copy ID to Clipboard");
    }, 3000);
  }

  // return sidebar
  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <p className='d-flex mb-0 my-1'><span className='d-flex justify-content-center w-100'>Time : {time}</span></p>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted "><i>{id}</i></span>
        </div>

        <Button onClick={(e) => copyToClipbaord(e)} className="rounded-0" variant="secondary">
          {clipbaordText}
        </Button>

        <Button onClick={() => setModalOpen(true)} className="rounded-0" style={{marginTop: '2px'}}>
          {conversationsOpen ? 'Start Conversation' : 'Add Contact'}
        </Button>

        <Button onClick={() => clearLocalStorage()} className="rounded-0" style={{marginTop: '2px'}} variant="warning">
          Clear All
        </Button>

        <Button onClick={() => Logout()} className="rounded-0" style={{margin: '2px 0'}} variant="danger">
          Logout
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ?
          <NewConversationModal closeModal={closeModal} /> :
          <NewContactModal closeModal={closeModal} />
        }
      </Modal>
    </div>
  )
}
