export function showCall() {
  const callElement = document.getElementById('inCall');
  const entryElement = document.getElementById('entry');
  entryElement.classList.add('hidden');
  callElement.classList.remove('hidden');
}

export function showEntry() {
  const inCallElement = document.getElementById('inCall');
  const entryElement = document.getElementById('entry');
  const callElement = document.getElementById('call');
  callElement.innerText = '';
  entryElement.classList.remove('hidden');
  inCallElement.classList.add('hidden');
}
