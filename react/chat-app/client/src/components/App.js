// import react
import React from 'react';
// import login component
import Login from './Login';
// import localstorage hooks
import useLocalStorage from '../hooks/useLocalStorage';
// import uuid
import { v4 as uuidV4 } from 'uuid';
// import SocketProvider component
import { SocketProvider } from '../contexts/SocketProvider';
// import ContactsProvider component
import { ContactsProvider } from '../contexts/ContactsProvider';
// import ConversationsProvider component
import { ConversationsProvider } from '../contexts/ConversationsProvider';
// import dashboard component
import Dashboard from './Dashboard';

// define app component
function App() {
  // get state
  const [id, setId] = useLocalStorage('id', uuidV4());
  const [loader, setLoader] = useLocalStorage('isReady', false);

  // set dashboard
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} setLoader= {setLoader}/>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  // return component
  // return (
  //   id && localStorage.getItem("tmd-chat-app-isReady") ? dashboard : <Login onIdSubmit={setId} setLoader={setLoader}/>
  // )
  return (
    id && loader ? dashboard : <Login onIdSubmit={setId} setLoader={setLoader}/>
  );
}

// export app component
export default App;