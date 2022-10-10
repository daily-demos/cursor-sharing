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
  // Retrieve data from the event
  const { data } = e;

  // If the event type is not what we expect, early out
  if (data.type !== cursorUpdateMessageName) return;

  // If there's no valid position data in the event data,
  // throw an error
  if (!data.x || !data.y) {
    throw new Error('invalid cursor position data');
  }

  // Retrieve participant who sent this message
  const p = callFrame.participants()[e.fromId];

  // Retrieve the user name of the aprticipant
  // who sent this message, OR just their ID
  // if they don't have a user name set.
  let userName = e.fromId;
  if (p && p.user_name) {
    userName = p.user_name;
  }
  // Update the participant's remote cursor
  updateRemoteCursor(e.fromId, userName, data.x, data.y);
}
