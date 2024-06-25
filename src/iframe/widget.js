import {
  setupWindow,
  createWidget,
  setupDocument,
  getQueryParams,
  postIframeMessage
} from './utils';

const isPopup = getQueryParams('iframe-widget-js').style === 'popup';
const { iframe, iframeContainer } = await createWidget('iframe-widget-js');

function expand() {
  iframe.classList.add('expanded');
  iframeContainer.classList.add('expanded');
}

function collapse() {
  iframe.classList.remove('expanded');
  iframeContainer.classList.remove('expanded');
}

function close() {
  postIframeMessage(iframe, 'close');
  iframeContainer.remove();
  iframe.remove();
}

function collapseOnBlur(event) {
  if (!iframeContainer.contains(event.target)) {
    postIframeMessage(iframe, 'collapse');
  }
}

if (isPopup) {
  setupDocument(collapseOnBlur);
  setupWindow(expand, collapse, close);
}
