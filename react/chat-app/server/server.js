// require socket module
const io = require('socket.io')(5000);

// on connection
io.on('connection', socket => {  
  // get socket id
  const id = socket.handshake.query.id;

  // log 
  console.log("socket connected to the client : " + id);

  // join in the room
  socket.join(id);

  // set listener
  socket.on('send-message', ({ recipients, text, time }) => {
    // loop recipients
    recipients.forEach(recipient => {
      // get newRecipients
      const newRecipients = recipients.filter(r => r !== recipient);

      // update newRecipients
      newRecipients.push(id);

      // socket broadcast
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text, time: time
      });
    });
  });
});

// server started
console.log('Server started on port 5000')