const organPool = document.querySelector('.organ-pool');
const organs = Array.from(document.querySelectorAll('.organ'));
const dropZones = Array.from(document.querySelectorAll('.drop-zone'));
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

const organLabels = {
  trachee: 'Trachée',
  poumons: 'Poumons',
  coeur: 'Cœur',
  estomac: 'Estomac',
  foie: 'Foie',
  intestin: 'Intestin',
};

function onDragStart(event) {
  const organId = event.target.id;
  event.dataTransfer.setData('text/plain', organId);
  event.dataTransfer.effectAllowed = 'move';
  event.target.classList.add('drop-preview');
  event.target.setAttribute('aria-grabbed', 'true');
}

function onDragEnd(event) {
  event.target.classList.remove('drop-preview');
  event.target.setAttribute('aria-grabbed', 'false');
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  if (!event.currentTarget.classList.contains('over')) {
    event.currentTarget.classList.add('over');
  }
}

function handleDragLeave(event) {
  event.currentTarget.classList.remove('over');
}

function handleDrop(event) {
  event.preventDefault();
  const dropZone = event.currentTarget;
  const organId = event.dataTransfer.getData('text/plain');
  const organElement = document.getElementById(organId);

  dropZone.classList.remove('over');

  if (!organElement) {
    return;
  }

  const expectedOrgan = dropZone.dataset.organ;
  const organType = organElement.dataset.organ;

  if (organType !== expectedOrgan) {
    flashError(dropZone, `❌ ${organElement.textContent} n'est pas au bon endroit. Réessaie !`);
    return;
  }

  placeOrgan(dropZone, organElement);
  statusUpdate(`✅ ${organElement.textContent} correctement positionné !`, 'success');
  checkCompletion();
}

function placeOrgan(dropZone, organElement) {
  // Replace existing organ in zone if present
  const existingOrgan = dropZone.querySelector('.organ');
  if (existingOrgan && existingOrgan !== organElement) {
    resetOrgan(existingOrgan);
  }

  dropZone.innerHTML = '';
  dropZone.appendChild(organElement);
  dropZone.classList.add('correct');
  dropZone.classList.remove('incorrect');
}

function flashError(element, message) {
  element.classList.remove('incorrect');
  // force reflow to replay animation
  // eslint-disable-next-line no-unused-expressions
  element.offsetWidth;
  element.classList.add('incorrect');
  element.classList.remove('correct');
  statusUpdate(message, 'error');
}

function statusUpdate(message, type) {
  status.textContent = message;
  status.classList.remove('error', 'success');
  if (type) {
    status.classList.add(type);
  }
}

function checkCompletion() {
  const isComplete = dropZones.every((zone) => {
    const organInZone = zone.querySelector('.organ');
    return organInZone && organInZone.dataset.organ === zone.dataset.organ;
  });

  if (isComplete) {
    statusUpdate('🎉 Bravo ! Tous les organes sont au bon endroit.', 'success');
  }
}

function resetOrgan(organElement) {
  organElement.classList.remove('drop-preview');
  organElement.setAttribute('aria-grabbed', 'false');
  organPool.appendChild(organElement);
}

function resetBoard() {
  dropZones.forEach((zone) => {
    zone.classList.remove('correct', 'incorrect');
    const organ = zone.querySelector('.organ');
    if (organ) {
      resetOrgan(organ);
    }
    zone.innerHTML = `<span>${organLabels[zone.dataset.organ] || capitalize(zone.dataset.organ)}</span>`;
  });
  statusUpdate('Organes réinitialisés. Tu peux recommencer !');
}

function capitalize(value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function enablePoolDropZone() {
  organPool.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    organPool.classList.add('over');
  });

  organPool.addEventListener('dragleave', () => {
    organPool.classList.remove('over');
  });

  organPool.addEventListener('drop', (event) => {
    event.preventDefault();
    organPool.classList.remove('over');
    const organId = event.dataTransfer.getData('text/plain');
    const organElement = document.getElementById(organId);
    if (!organElement) return;
    resetOrgan(organElement);
    statusUpdate(`${organElement.textContent} a été remis dans la réserve.`);
  });
}

organs.forEach((organ) => {
  organ.addEventListener('dragstart', onDragStart);
  organ.addEventListener('dragend', onDragEnd);
});

dropZones.forEach((zone) => {
  zone.addEventListener('dragover', handleDragOver);
  zone.addEventListener('dragleave', handleDragLeave);
  zone.addEventListener('drop', handleDrop);
});

enablePoolDropZone();
resetButton.addEventListener('click', resetBoard);

statusUpdate('Glisse chaque organe sur la zone correspondante du schéma.');
