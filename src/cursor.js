let mouseStopTimeout;

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
  window.addEventListener(
    'mousemove',
    (e) => {
      clearTimeout(mouseStopTimeout);

      mouseStopTimeout = setTimeout((_) => {
        sendData(e, callback);
      }, 300);
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
  callback(e.clientX, e.clientY);
}

function createCursorDiv(userID) {
  const ele = document.createElement('div');
  ele.id = getCursorID(userID);
  ele.classList.add('cursor');
  const container = document.getElementById('container');
  container.appendChild(ele);
  return ele;
}

function getCursorID(userID) {
  return `cursor-${userID}`;
}
