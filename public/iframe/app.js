function F(L) {
  const M = `
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
      ${L.position === 'right' ? 'right: 20px;' : 'left: 20px;'}
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
      max-width: min(${Q[L.size].width}, 100% - 40px);
    }

    .iframe__wrapper .iframe__container.expanded .iframe__app.expanded {
      max-width: 100%;
    }
  `;
  return L.style === 'popup'
    ? M
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
const Q = {
  sm: { width: '400px', height: '600px' },
  md: { width: '600px', height: '800px' },
  lg: { width: '800px', height: '1000px' },
  xl: { width: '1000px', height: '1200px' },
  '2xl': { width: '1200px', height: '1400px' },
  full: { width: '100%', height: '100%' }
};
function B() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  const L = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const D =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width: L, height: D };
}
function d() {
  const L = window.location.href;
  return ['localhost', ...I].some((D) => L.includes(D)) ? '' : I[0];
}
function x(L, D) {
  const M = L.split('?')[1];
  if (!M) return null;
  const T = M.split('&').reduce((j, A) => {
    const K = A.split('=');
    return (j[decodeURIComponent(K[0])] = decodeURIComponent(K[1])), j;
  }, {});
  return D ? T[D] : T;
}
function R(L, D) {
  const M = O[L];
  const T = !W.includes(L);
  const j = D ? document.querySelector(`script[src*="${D}"]`).src : window.location.href;
  const A = x(j, L) ?? M[0];
  return T ? (M.includes(A) ? A : M[0]) : A;
}
function H(L) {
  return Object.keys(O).reduce((D, M) => {
    const T = R(M, L);
    return T ? { ...D, [M]: T } : D;
  }, {});
}
function C(L) {
  const D = B();
  const M = H(L);
  return D.width < 768 && (M.state = 'collapse'), new URLSearchParams(M).toString();
}
function h(L, D, M) {
  const T = R('state', M);
  !y(T) && E(L, D);
}
async function _(L) {
  return new Promise((D) => setTimeout(D, L));
}
function y(L) {
  return $ === L;
}
function w(L) {
  return ($ = L), L;
}
function E(L, D) {
  $ === 'expand' ? D() : L();
}
function Y(L) {
  window.parent !== window && window.parent.postMessage(w(L), '*');
}
function v(L, D) {
  L?.contentWindow?.postMessage(w(D), '*');
}
function V(L, D, M) {
  L.addEventListener('click', () => E(D, M));
}
function q(L, D, M) {
  window.addEventListener('message', (T) => {
    T.data === 'collapse' && D(), T.data === 'expand' && L(), T.data === 'close' && M();
  });
}
function z(L) {
  document.addEventListener('click', L);
}
async function f(L) {
  const D = H(L);
  const M = document.createElement('style');
  (M.textContent = F(D)), document.head.appendChild(M), await _(100);
  const T = document.createElement('div');
  T.classList.add('iframe__wrapper'), (T.id = 'iframeWrapper'), document.body.appendChild(T);
  const j = document.createElement('div');
  j.classList.add('iframe__container'), (j.id = 'iframeContainer'), T.appendChild(j);
  const A = d();
  const K = C(L);
  const G = document.createElement('iframe');
  return (
    G.classList.add('iframe__app'),
    (G.id = 'iframeApp'),
    (G.allowFullscreen = !0),
    (G.src = `${A}/iframe-app?${K}`),
    j.appendChild(G),
    { iframe: G, iframeContainer: j, iframeWrapper: T }
  );
}
function P() {
  const D = { systemPrompt: H().prompt };
  return new URLSearchParams(D).toString();
}
function U() {
  const L = H();
  const D = P();
  const M = L.style === 'popup';
  const T = document.createElement('div');
  if (
    ((T.id = M ? 'popupContainer' : 'inlineContainer'),
    (T.className = M ? 'popup-container' : 'inline-container'),
    M)
  )
    document.body.appendChild(T);
  else (document.getElementById(L.inlineParentId) ?? document.body).appendChild(T);
  const j = document.createElement('iframe');
  (j.allowFullscreen = !0),
    (j.id = M ? 'popupIframe' : 'inlineIframe'),
    (j.className = M ? 'popup-iframe' : 'inline-iframe'),
    (j.src = `/external/${L.app}?${D}`),
    T.appendChild(j);
  let A = null;
  if (M)
    (A = document.createElement('button')),
      (A.id = 'toggleButton'),
      (A.className = 'toggle-button'),
      document.body.appendChild(A);
  return { iframe: j, iframeContainer: T, toggleButton: A };
}
const I = [];
const O = {
  inlineParentId: [''],
  style: ['popup', 'inline'],
  position: ['right', 'left'],
  state: ['collapse', 'expand'],
  prompt: ['none', 'social', 'business'],
  size: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
  app: ['chat', 'bot', 'write', 'document', 'image']
};
const W = ['inlineParentId'];
let $ = 'collapse';
const k = () => {
  Y('expand'),
    X.classList.add('open-popup'),
    J.classList.add('visible-popup'),
    J.classList.remove('hidden-popup');
};
const Z = () => {
  Y('collapse'),
    X.classList.remove('open-popup'),
    J.classList.add('hidden-popup'),
    J.classList.remove('visible-popup');
};
const u = () => {
  Y('close'), X.remove(), J.remove();
};
const S = (L) => {
  if (!J.contains(L.target) && !X.contains(L.target)) Z();
};
const N = H().style === 'popup';
const { toggleButton: X, iframeContainer: J } = U();
if (N) z(S), q(k, Z, u), V(X, k, Z), await _(1000), h(k, Z);
