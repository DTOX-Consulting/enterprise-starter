function F(k) {
  const _ = `
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
      ${k.position === 'right' ? 'right: 20px;' : 'left: 20px;'}
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
      max-width: min(${Q[k.size].width}, 100% - 40px);
    }

    .iframe__wrapper .iframe__container.expanded .iframe__app.expanded {
      max-width: 100%;
    }
  `;
  return k.style === 'popup'
    ? _
    : `
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
}
var Q = {
  sm: { width: '400px', height: '600px' },
  md: { width: '600px', height: '800px' },
  lg: { width: '800px', height: '1000px' },
  xl: { width: '1000px', height: '1200px' },
  '2xl': { width: '1200px', height: '1400px' },
  full: { width: '100%', height: '100%' }
};
function x() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  const k = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    R = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width: k, height: R };
}
function y() {
  const k = window.location.href;
  return ['localhost', ...I].some((R) => k.includes(R)) ? '' : I[0];
}
function N(k, R) {
  const _ = k.split('?')[1];
  if (!_) return null;
  const h = _.split('&').reduce((j, G) => {
    const L = G.split('=');
    return (j[decodeURIComponent(L[0])] = decodeURIComponent(L[1])), j;
  }, {});
  return R ? h[R] : h;
}
function V(k, R) {
  const _ = T[k],
    h = !W.includes(k),
    j = R ? document.querySelector(`script[src*="${R}"]`).src : window.location.href,
    G = N(j, k) ?? _[0];
  return h ? (_.includes(G) ? G : _[0]) : G;
}
function J(k) {
  return Object.keys(T).reduce((R, _) => {
    const h = V(_, k);
    return h ? { ...R, [_]: h } : R;
  }, {});
}
function B(k) {
  const R = x(),
    _ = J(k);
  return R.width < 768 && (_.state = 'collapse'), new URLSearchParams(_).toString();
}
function w(k, R, _) {
  const h = V('state', _);
  !b(h) && A(k, R);
}
async function $(k) {
  return new Promise((R) => setTimeout(R, k));
}
function b(k) {
  return D === k;
}
function z(k) {
  return (D = k), k;
}
function A(k, R) {
  D === 'expand' ? R() : k();
}
function Y(k) {
  window.parent !== window && window.parent.postMessage(z(k), '*');
}
function u(k, R) {
  k?.contentWindow?.postMessage(z(R), '*');
}
function q(k, R, _) {
  k.addEventListener('click', () => A(R, _));
}
function M(k, R, _) {
  window.addEventListener('message', (h) => {
    h.data === 'collapse' && R(), h.data === 'expand' && k(), h.data === 'close' && _();
  });
}
function O(k) {
  document.addEventListener('click', k);
}
async function c(k) {
  const R = J(k),
    _ = document.createElement('style');
  (_.textContent = F(R)), document.head.appendChild(_), await $(100);
  const h = document.createElement('div');
  h.classList.add('iframe__wrapper'), (h.id = 'iframeWrapper'), document.body.appendChild(h);
  const j = document.createElement('div');
  j.classList.add('iframe__container'), (j.id = 'iframeContainer'), h.appendChild(j);
  const G = y(),
    L = B(k),
    H = document.createElement('iframe');
  return (
    H.classList.add('iframe__app'),
    (H.id = 'iframeApp'),
    (H.allowFullscreen = !0),
    (H.src = `${G}/iframe-app?${L}`),
    j.appendChild(H),
    { iframe: H, iframeContainer: j, iframeWrapper: h }
  );
}
function C() {
  const R = { systemPrompt: J().prompt };
  return new URLSearchParams(R).toString();
}
function U() {
  const k = J(),
    R = C(),
    _ = k.style === 'popup',
    h = document.createElement('div');
  if (
    ((h.id = _ ? 'popupContainer' : 'inlineContainer'),
    (h.className = _ ? 'popup-container' : 'inline-container'),
    _)
  )
    document.body.appendChild(h);
  else (document.getElementById(k.inlineParentId) ?? document.body).appendChild(h);
  const j = document.createElement('iframe');
  (j.allowFullscreen = !0),
    (j.id = _ ? 'popupIframe' : 'inlineIframe'),
    (j.className = _ ? 'popup-iframe' : 'inline-iframe'),
    (j.src = `/external/${k.app}?${R}`),
    h.appendChild(j);
  let G = null;
  if (_)
    (G = document.createElement('button')),
      (G.id = 'toggleButton'),
      (G.className = 'toggle-button'),
      document.body.appendChild(G);
  return { iframe: j, iframeContainer: h, toggleButton: G };
}
var I = ['https://pulseline-app.vercel.app', 'https://app.pulseline.io'],
  T = {
    inlineParentId: [''],
    style: ['popup', 'inline'],
    position: ['right', 'left'],
    state: ['collapse', 'expand'],
    prompt: ['none', 'social', 'business'],
    size: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    app: ['chat', 'bot', 'write', 'document', 'image']
  },
  W = ['inlineParentId'],
  D = 'collapse';
var E = function () {
    Y('expand'),
      X.classList.add('open-popup'),
      K.classList.add('visible-popup'),
      K.classList.remove('hidden-popup');
  },
  Z = function () {
    Y('collapse'),
      X.classList.remove('open-popup'),
      K.classList.add('hidden-popup'),
      K.classList.remove('visible-popup');
  },
  d = function () {
    Y('close'), X.remove(), K.remove();
  },
  S = function (k) {
    if (!K.contains(k.target) && !X.contains(k.target)) Z();
  },
  P = J().style === 'popup',
  { toggleButton: X, iframeContainer: K } = U();
if (P) O(S), M(E, Z, d), q(X, E, Z), await $(1000), w(E, Z);
