// import react and hooks
import React, { useContext, useEffect, useState } from 'react';
// import socket
import io from 'socket.io-client';

// create socket context
const SocketContext = React.createContext();

// export use socket function
export function useSocket() {
  // return context
  return useContext(SocketContext);
}

// export SocketProvider component
export function SocketProvider({ id, children }) {
  // set state
  const [socket, setSocket] = useState();

  // use effect hooks
  useEffect(() => {
    /* Documentation https://socket.io/docs/v4/client-api */
    // socket connection
    const newSocket = io(
      'http://localhost:5000',
      { query: { id } }
    );

    // update state
    setSocket(newSocket);

    // socket close
    return () => newSocket.close();
  }, [id]);

  // return socket procider
  return (
    <SocketContext.Provider value={socket}> 
      {children}
    </SocketContext.Provider>
  );
}
