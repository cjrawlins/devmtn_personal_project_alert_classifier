
const io = require('socket.io')();



io.on('connection', (client) => {
    console.log('User Connected');

    client.on('test', () => {
      client.emit('backTest', () => {
        console.log('sending back test');
      })
    })
    
    client.on('newEvent', () => {
      client.broadcast.emit('newEventClient', 'hello Client, there is a new event'); 
    })

  });



const port = 8000;
io.listen(port);
console.log('SocketIO is listening on port ', port);