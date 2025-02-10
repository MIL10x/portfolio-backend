const net = require('net');

const host = '3.6.11.149';  // MongoDB IP
const port = 27017;         // MongoDB default port

const socket = new net.Socket();

socket.setTimeout(5000);  // Set timeout to 5 seconds

socket.on('connect', () => {
  console.log(`Connected to ${host}:${port}`);
  socket.end();  // Close the connection
});

socket.on('timeout', () => {
  console.log(`Timeout connecting to ${host}:${port}`);
  socket.destroy();  // Close the socket
});

socket.on('error', (err) => {
  console.error(`Connection error: ${err.message}`);
  socket.destroy();  // Close the socket
});

socket.connect(port, host);  // Connect to the host and port

