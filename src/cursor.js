let mouseStopTimeout;
let contentDiv;

export function updateRemoteCursor(userID, userName, posX, posY) {
  let cursorDiv = document.getElementById(getCursorID(userID));
  if (!cursorDiv) {
    cursorDiv = createCursorDiv(userID);
  }

  const text = `↖️ ${userName}`;
  if (cursorDiv.innerText !== text) {
    cursorDiv.innerText = text;
  }
  cursorDiv.style.left = `${posX}px`;
  cursorDiv.style.top = `${posY}px`;
}

export function startCursorListener(callback) {
  contentDiv = document.getElementById('content');
  const scrollDiv = document.getElementById('scroll');
  scrollDiv.addEventListener(
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
  const cursorDiv = document.getElementById(getCursorID(userID));
  cursorDiv?.remove();
}

export function removeAllCursors() {
  const cursors = document.getElementsByClassName('cursor');
  for (let i = 0; i < cursors.length; i += 1) {
    cursors[i].remove();
  }
}

function sendData(e, callback) {
  if (!contentDiv) return;
  // Send data relative to the user's position
  // in the content DIV
  const rect = contentDiv.getBoundingClientRect();
  const x = e.clientX - rect.x;
  const y = e.clientY - rect.y;
  callback(x, y);
}

function createCursorDiv(userID) {
  if (!contentDiv) return;
  const ele = document.createElement('div');
  ele.id = getCursorID(userID);
  ele.classList.add('cursor');
  contentDiv.appendChild(ele);
  return ele;
}

function getCursorID(userID) {
  return `cursor-${userID}`;
}
