import joinCall from './call.js';
import { showCall } from './scenes.js';

window.addEventListener('DOMContentLoaded', () => {
  // Setup entry
  const form = document.getElementById('enterCall');
  form.onsubmit = (ev) => {
    ev.preventDefault();
    const roomInput = document.getElementById('roomURL');
    const roomURL = roomInput.value;
    joinCall(roomURL);
    showCall();
  };
});
