import { getWidgetStyle } from './utils.css';

const domains = ['https://pulseline-app.vercel.app', 'https://app.pulseline.io'];

const available = {
  inlineParentId: [''],
  style: ['popup', 'inline'],
  position: ['right', 'left'],
  state: ['collapse', 'expand'],
  prompt: ['none', 'social', 'business'],
  size: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
  app: ['chat', 'bot', 'write', 'document', 'image']
};

const noValidation = ['inlineParentId'];

export function getScreenSize() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  const width =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width, height };
}

export function getIframePrefix() {
  const currentUrl = window.location.href;
  return ['localhost', ...domains].some((str) => currentUrl.includes(str)) ? '' : domains[0];
}

/**
 *
 *
 * @export
 * @param url {string}
 * @param variable {string}
 * @returns {string | Record<string, string>}
 */
export function getQueryVariable(url, variable) {
  const query = url.split('?')[1];
  if (!query) {
    return null;
  }

  const vars = query.split('&').reduce((acc, item) => {
    const pair = item.split('=');
    acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    return acc;
  }, {});

  return variable ? vars[variable] : vars;
}

/**
 *
 *
 * @export
 * @param variable {keyof typeof available}
 * @param scriptName {string}
 * @returns {string}
 */
export function getStarting(variable, scriptName) {
  const allowed = available[variable];
  const validate = !noValidation.includes(variable);

  /** @type {string} */
  const currentScriptUrl = scriptName
    ? document.querySelector(`script[src*="${scriptName}"]`).src
    : window.location.href;

  const start = getQueryVariable(currentScriptUrl, variable) ?? allowed[0];
  return validate ? (allowed.includes(start) ? start : allowed[0]) : start;
}

export function getQueryParams(scriptName) {
  return Object.keys(available).reduce((acc, variable) => {
    const value = getStarting(variable, scriptName);
    if (value) {
      acc[variable] = value;
    }
    return acc;
  }, {});
}

export function getUrlSearchParams(scriptName) {
  const screenSize = getScreenSize();
  const params = getQueryParams(scriptName);
  if (screenSize.width < 768) {
    params.state = 'collapse';
  }
  return new URLSearchParams(params).toString();
}

export function setupStartingState(expand, collapse, scriptName) {
  const startingState = getStarting('state', scriptName);
  !isState(startingState) && toggleState(expand, collapse);
}

export async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let currentState = 'collapse';

export function isState(state) {
  return currentState === state;
}

export function getState() {
  return currentState;
}

export function setState(state) {
  currentState = state;
  return state;
}

export function toggleState(expand, collapse) {
  currentState === 'expand' ? collapse() : expand();
}

export function postMessage(state) {
  window.parent !== window && window.parent.postMessage(setState(state), '*');
}

export function postIframeMessage(iframe, state) {
  iframe?.contentWindow?.postMessage(setState(state), '*');
}

export function setupToggleButton(toggleButton, expand, collapse) {
  toggleButton.addEventListener('click', () => toggleState(expand, collapse));
}

export function setupWindow(expand, collapse, close) {
  window.addEventListener('message', (event) => {
    event.data === 'collapse' && collapse();
    event.data === 'expand' && expand();
    event.data === 'close' && close();
  });
}

export function setupDocument(collapseOnBlur) {
  document.addEventListener('click', collapseOnBlur);
}

export async function createWidget(scriptName) {
  const params = getQueryParams(scriptName);
  const styleElement = document.createElement('style');
  styleElement.textContent = getWidgetStyle(params);

  document.head.appendChild(styleElement);
  await delay(100);

  const iframeWrapper = document.createElement('div');
  iframeWrapper.classList.add('iframe__wrapper');
  iframeWrapper.id = 'iframeWrapper';
  document.body.appendChild(iframeWrapper);

  const iframeContainer = document.createElement('div');
  iframeContainer.classList.add('iframe__container');
  iframeContainer.id = 'iframeContainer';
  iframeWrapper.appendChild(iframeContainer);

  const iframePrefix = getIframePrefix();
  const query = getUrlSearchParams(scriptName);

  const iframe = document.createElement('iframe');
  iframe.classList.add('iframe__app');
  iframe.id = 'iframeApp';
  iframe.allowFullscreen = true;
  iframe.src = `${iframePrefix}/iframe-app?${query}`;

  iframeContainer.appendChild(iframe);
  return { iframe, iframeContainer, iframeWrapper };
}

export function getParamsForApp() {
  const params = getQueryParams();

  const neededParams = {
    systemPrompt: params.prompt
  };

  return new URLSearchParams(neededParams).toString();
}

export function createApp() {
  const params = getQueryParams();
  const appParams = getParamsForApp();
  const isPopup = params.style === 'popup';

  const iframeContainer = document.createElement('div');
  iframeContainer.id = isPopup ? 'popupContainer' : 'inlineContainer';
  iframeContainer.className = isPopup ? 'popup-container' : 'inline-container';

  if (isPopup) {
    document.body.appendChild(iframeContainer);
  } else {
    const parent = document.getElementById(params.inlineParentId) ?? document.body;
    parent.appendChild(iframeContainer);
  }

  const iframe = document.createElement('iframe');
  iframe.allowFullscreen = true;
  iframe.id = isPopup ? 'popupIframe' : 'inlineIframe';
  iframe.className = isPopup ? 'popup-iframe' : 'inline-iframe';
  iframe.src = `/external/${params.app}?${appParams}`;

  iframeContainer.appendChild(iframe);

  let toggleButton = null;

  if (isPopup) {
    toggleButton = document.createElement('button');
    toggleButton.id = 'toggleButton';
    toggleButton.className = 'toggle-button';
    document.body.appendChild(toggleButton);
  }

  return { iframe, iframeContainer, toggleButton };
}
