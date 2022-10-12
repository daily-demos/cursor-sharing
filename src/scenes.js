export function showCall() {
  const callElement = document.getElementById('inCall');
  const entryElement = document.getElementById('entry');
  entryElement.classList.add('hidden');
  callElement.classList.remove('hidden');
}

export function showEntry() {
  const callElement = document.getElementById('inCall');
  const entryElement = document.getElementById('entry');
  entryElement.classList.remove('hidden');
  callElement.classList.add('hidden');
}
