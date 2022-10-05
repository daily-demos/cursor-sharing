import {
  removeAllCursors,
  removeCursor,
  startCursorListener,
  updateRemoteCursor,
} from './cursor.js';
import { showEntry } from './scenes.js';

const cursorUpdateMessageName = 'cursorPos';

export default function joinCall(roomURL) {
  const container = document.getElementById('call');

  const callFrame = window.DailyIframe.createFrame(container, {
    showLeaveButton: true,
    activeSpeakerMode: false,
  })
    .on('app-message', (e) => {
      handleAppMessage(callFrame, e);
    })
    .on('joined-meeting', (_) => {
      // When local participant joins the meeting, start broadcasting
      // cursor data to remote participants
      const callback = (x, y) => {
        callFrame.sendAppMessage({
          type: cursorUpdateMessageName,
          x,
          y,
        });
      };

      startCursorListener(callback);
    })
    .on('left-meeting', () => {
      removeAllCursors();
      showEntry();
    })
    .on('participant-left', (e) => {
      removeCursor(e.participant.session_id);
    });
  callFrame.join({ url: roomURL });
}

function handleAppMessage(callFrame, e) {
  // Handling app message
  const { data } = e;
  if (data.type !== cursorUpdateMessageName) return;

  if (!data.x || !data.y) {
    throw new Error('invalid cursor position data');
  }

  const p = callFrame.participants()[e.fromId];
  let userName = e.fromId;
  if (p && p.user_name) {
    userName = p.user_name;
  }
  // Find this participant's name
  updateRemoteCursor(e.fromId, userName, data.x, data.y);
}
