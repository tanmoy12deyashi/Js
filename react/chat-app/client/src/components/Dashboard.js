// import react and hooks
import React from 'react';
// import sidebar
import Sidebar from './Sidebar';
// import conversation component
import OpenConversation from './OpenConversation';
// import conversation provider
import { useConversations } from '../contexts/ConversationsProvider';

// export dashboard component
export default function Dashboard({ id, setLoader }) {
  // get selected conversation
  const { selectedConversation } = useConversations();

  // return component
  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} setLoader={setLoader}/>
      {selectedConversation && <OpenConversation />}
    </div>
  )
}
