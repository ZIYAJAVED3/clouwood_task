import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"]
  }
});

const initialState = {
  bedroom: {
    light1: false,
    light2: false
  },
  kitchen: {
    light1: false,
    light2: false
  }
};

let state = { ...initialState };

io.on('connection', (socket) => {
  console.log('User connected');
  
  socket.on('requestInitialState', () => {
    console.log('Sending initial state:', state);
    socket.emit('initialState', state);
  });

  socket.on('toggleLight', (data) => {
    const { room, light } = data;
    console.log('Toggle light request:', room, light);
    
    if (state[room] && state[room][light] !== undefined) {
      state[room][light] = !state[room][light];
      console.log('New state after toggle:', state);
      io.emit('stateUpdate', state);
    }
  });

  socket.on('bothLights', (room) => {
    console.log('Both lights request for room:', room);
    
    if (state[room]) {
      state[room].light1 = true;
      state[room].light2 = true;
      console.log('New state after both lights:', state);
      io.emit('stateUpdate', state);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});