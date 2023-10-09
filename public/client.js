const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); //used to obtain a 2D rendering context for id name canvas

const socket = io();

let drawing = false; // initialization of variable 

canvas.addEventListener('mousedown', () => { // when the mouse button is pressed down it sets a variable drawing to true.
  drawing = true;
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath(); // method is used to start a new path for drawing
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;  //if not drawing the the exitof function

  const { offsetX, offsetY } = e; // its indicated the top-left coordinates
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  ctx.lineTo(offsetX, offsetY);
  ctx.stroke(); //draws the line on the canvas using the current stroke properties 

  socket.emit('draw', { x: offsetX, y: offsetY }); 
}); //The drawing action includes setting up the drawing context properties and 
//emitting drawing data to a Socket.IO server for potential synchronization with other clients

socket.on('draw', (data) => {
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  ctx.lineTo(data.x, data.y); //epresenting the mouse coordinates where the drawing action took place on the sending client.
  ctx.stroke();
}); // code allows the client to receive drawing data sent by other clients via Socket.IO 
//and replicate the drawing action on its own canvas
