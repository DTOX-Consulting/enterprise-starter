import {
  delay,
  createApp,
  setupWindow,
  postMessage,
  setupDocument,
  getQueryParams,
  setupToggleButton,
  setupStartingState
} from './utils';

const isPopup = getQueryParams().style === 'popup';
const { toggleButton, iframeContainer } = createApp();

function expand() {
  postMessage('expand');
  toggleButton.classList.add('open-popup');
  iframeContainer.classList.add('visible-popup');
  iframeContainer.classList.remove('hidden-popup');
}

function collapse() {
  postMessage('collapse');
  toggleButton.classList.remove('open-popup');
  iframeContainer.classList.add('hidden-popup');
  iframeContainer.classList.remove('visible-popup');
}

function close() {
  postMessage('close');
  toggleButton.remove();
  iframeContainer.remove();
}

function collapseOnBlur(event) {
  if (!iframeContainer.contains(event.target) && !toggleButton.contains(event.target)) {
    collapse();
  }
}
if (isPopup) {
  setupDocument(collapseOnBlur);
  setupWindow(expand, collapse, close);
  setupToggleButton(toggleButton, expand, collapse);

  await delay(1000);
  setupStartingState(expand, collapse);
}
