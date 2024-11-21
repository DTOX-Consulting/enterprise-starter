// src/iframe/utils.css.js
var sizes = {
  sm: {
    width: "400px",
    height: "600px"
  },
  md: {
    width: "600px",
    height: "800px"
  },
  lg: {
    width: "800px",
    height: "1000px"
  },
  xl: {
    width: "1000px",
    height: "1200px"
  },
  "2xl": {
    width: "1200px",
    height: "1400px"
  },
  full: {
    width: "100%",
    height: "100%"
  }
};
function getWidgetStyle(params) {
  const inline = `
    .iframe__wrapper {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
    .iframe__wrapper .iframe__container .iframe__app {
      width: 100%;
      height: 100%;
      border: none;
      min-height: 704px;
      max-height: 808px;
      background-color: transparent;
    }
  `;
  const popup = `
    .iframe__wrapper {
      right: 0;
      bottom: 0;
      height: 0;
      margin: 0;
      padding: 0;
      width: 100%;
      position: absolute;
      z-index: 2147483000;
      background-color: transparent;
    }
    .iframe__wrapper .iframe__container {
      bottom: 20px;
      position: fixed;
      background-color: transparent;
      ${params.position === "right" ? "right: 20px;" : "left: 20px;"}
    }
    .iframe__wrapper .iframe__container .iframe__app {
      width: 48px;
      height: 48px;
      border: none;
      border-radius: 24px;
      background-color: transparent;
    }
    .iframe__wrapper .iframe__container.expanded,
    .iframe__wrapper .iframe__container.expanded .iframe__app.expanded {
      width: 100%;
      height: 100%;
      bottom: 23px;
      max-height: 808px;
      background-color: transparent;
      max-width: min(${sizes[params.size].width}, 100% - 40px);
    }

    .iframe__wrapper .iframe__container.expanded .iframe__app.expanded {
      max-width: 100%;
    }
  `;
  return params.style === "popup" ? popup : inline;
}

// src/iframe/utils.js
var domains = [];
var available = {
  inlineParentId: [""],
  style: ["popup", "inline"],
  position: ["right", "left"],
  state: ["collapse", "expand"],
  prompt: ["none", "social", "business"],
  size: ["sm", "md", "lg", "xl", "2xl", "full"],
  app: ["chat", "bot", "write", "document", "image"]
};
var noValidation = ["inlineParentId"];
function getScreenSize() {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width, height };
}
function getIframePrefix() {
  const currentUrl = window.location.href;
  return ["localhost", ...domains].some((str) => currentUrl.includes(str)) ? "" : domains[0];
}
function getQueryVariable(url, variable) {
  const query = url.split("?")[1];
  if (!query) {
    return null;
  }
  const vars = query.split("&").reduce((acc, item) => {
    const pair = item.split("=");
    acc[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    return acc;
  }, {});
  return variable ? vars[variable] : vars;
}
function getStarting(variable, scriptName) {
  const allowed = available[variable];
  const validate = !noValidation.includes(variable);
  const currentScriptUrl = scriptName ? document.querySelector(`script[src*="${scriptName}"]`).src : window.location.href;
  const start = getQueryVariable(currentScriptUrl, variable) ?? allowed[0];
  return validate ? allowed.includes(start) ? start : allowed[0] : start;
}
function getQueryParams(scriptName) {
  return Object.keys(available).reduce((acc, variable) => {
    const value = getStarting(variable, scriptName);
    if (value) {
      acc[variable] = value;
    }
    return acc;
  }, {});
}
function getUrlSearchParams(scriptName) {
  const screenSize = getScreenSize();
  const params = getQueryParams(scriptName);
  if (screenSize.width < 768) {
    params.state = "collapse";
  }
  return new URLSearchParams(params).toString();
}
function setupStartingState(expand, collapse, scriptName) {
  const startingState = getStarting("state", scriptName);
  !isState(startingState) && toggleState(expand, collapse);
}
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var currentState = "collapse";
function isState(state) {
  return currentState === state;
}
function setState(state) {
  currentState = state;
  return state;
}
function toggleState(expand, collapse) {
  currentState === "expand" ? collapse() : expand();
}
function postMessage(state) {
  window.parent !== window && window.parent.postMessage(setState(state), "*");
}
function postIframeMessage(iframe, state) {
  iframe?.contentWindow?.postMessage(setState(state), "*");
}
function setupToggleButton(toggleButton, expand, collapse) {
  toggleButton.addEventListener("click", () => toggleState(expand, collapse));
}
function setupWindow(expand, collapse, close) {
  window.addEventListener("message", (event) => {
    event.data === "collapse" && collapse();
    event.data === "expand" && expand();
    event.data === "close" && close();
  });
}
function setupDocument(collapseOnBlur) {
  document.addEventListener("click", collapseOnBlur);
}
async function createWidget(scriptName) {
  const params = getQueryParams(scriptName);
  const styleElement = document.createElement("style");
  styleElement.textContent = getWidgetStyle(params);
  document.head.appendChild(styleElement);
  await delay(100);
  const iframeWrapper = document.createElement("div");
  iframeWrapper.classList.add("iframe__wrapper");
  iframeWrapper.id = "iframeWrapper";
  document.body.appendChild(iframeWrapper);
  const iframeContainer = document.createElement("div");
  iframeContainer.classList.add("iframe__container");
  iframeContainer.id = "iframeContainer";
  iframeWrapper.appendChild(iframeContainer);
  const iframePrefix = getIframePrefix();
  const query = getUrlSearchParams(scriptName);
  const iframe = document.createElement("iframe");
  iframe.classList.add("iframe__app");
  iframe.id = "iframeApp";
  iframe.allowFullscreen = true;
  iframe.src = `${iframePrefix}/iframe-app?${query}`;
  iframeContainer.appendChild(iframe);
  return { iframe, iframeContainer, iframeWrapper };
}
function getParamsForApp() {
  const params = getQueryParams();
  const neededParams = {
    systemPrompt: params.prompt
  };
  return new URLSearchParams(neededParams).toString();
}
function createApp() {
  const params = getQueryParams();
  const appParams = getParamsForApp();
  const isPopup = params.style === "popup";
  const iframeContainer = document.createElement("div");
  iframeContainer.id = isPopup ? "popupContainer" : "inlineContainer";
  iframeContainer.className = isPopup ? "popup-container" : "inline-container";
  if (isPopup) {
    document.body.appendChild(iframeContainer);
  } else {
    const parent = document.getElementById(params.inlineParentId) ?? document.body;
    parent.appendChild(iframeContainer);
  }
  const iframe = document.createElement("iframe");
  iframe.allowFullscreen = true;
  iframe.id = isPopup ? "popupIframe" : "inlineIframe";
  iframe.className = isPopup ? "popup-iframe" : "inline-iframe";
  iframe.src = `/external/${params.app}?${appParams}`;
  iframeContainer.appendChild(iframe);
  let toggleButton = null;
  if (isPopup) {
    toggleButton = document.createElement("button");
    toggleButton.id = "toggleButton";
    toggleButton.className = "toggle-button";
    document.body.appendChild(toggleButton);
  }
  return { iframe, iframeContainer, toggleButton };
}

// src/iframe/app.js
var isPopup = getQueryParams().style === "popup";
var { toggleButton, iframeContainer } = createApp();
function expand() {
  postMessage("expand");
  toggleButton.classList.add("open-popup");
  iframeContainer.classList.add("visible-popup");
  iframeContainer.classList.remove("hidden-popup");
}
function collapse() {
  postMessage("collapse");
  toggleButton.classList.remove("open-popup");
  iframeContainer.classList.add("hidden-popup");
  iframeContainer.classList.remove("visible-popup");
}
function close() {
  postMessage("close");
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
