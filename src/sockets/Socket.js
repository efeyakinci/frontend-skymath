import io from 'socket.io-client';
 
let socket = io('https://skymath.herokuapp.com/');
socket.on('connect', ()=>console.log('Connected'));


export default socket;