let mouseStopTimeout;
let contentElement;

export function updateRemoteCursor(userID, userName, posX, posY) {
  if (!contentElement) return;
  let cursorElement = document.getElementById(getCursorID(userID));
  if (!cursorElement) {
    cursorElement = createCursorElement(userID);
  }

  const text = `↖️ ${userName}`;
  if (cursorElement.innerText !== text) {
    cursorElement.innerText = text;
  }
  cursorElement.style.left = `${posX}px`;
  cursorElement.style.top = `${posY}px`;
}

export function startCursorListener(callback) {
  contentElement = document.getElementById('content');
  const scrollElement = document.getElementById('scroll');
  scrollElement.addEventListener(
    'mousemove',
    (e) => {
      clearTimeout(mouseStopTimeout);

      mouseStopTimeout = setTimeout((_) => {
        sendData(e, callback);
      }, 100);
    },
    false
  );
}

export function removeCursor(userID) {
  const cursorElement = document.getElementById(getCursorID(userID));
  cursorElement?.remove();
}

export function removeAllCursors() {
  const cursors = document.getElementsByClassName('cursor');
  for (let i = 0; i < cursors.length; i += 1) {
    cursors[i].remove();
  }
}

function sendData(e, callback) {
  if (!contentElement) return;
  // Send data relative to the user's position
  // in the content element
  const rect = contentElement.getBoundingClientRect();
  const x = e.clientX - rect.x;
  const y = e.clientY - rect.y;
  callback(x, y);
}

function createCursorElement(userID) {
  if (!contentElement) return null;
  const ele = document.createElement('div');
  ele.id = getCursorID(userID);
  ele.classList.add('cursor');
  contentElement.appendChild(ele);
  return ele;
}

function getCursorID(userID) {
  return `cursor-${userID}`;
}
