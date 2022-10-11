export function showCall() {
  const callDiv = document.getElementById('inCall');
  const entryDiv = document.getElementById('entry');
  entryDiv.classList.add('hidden');
  callDiv.classList.remove('hidden');
}

export function showEntry() {
  const callDiv = document.getElementById('inCall');
  const entryDiv = document.getElementById('entry');
  entryDiv.classList.remove('hidden');
  callDiv.classList.add('hidden');
}
