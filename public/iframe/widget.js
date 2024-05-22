function Z(L) {
  const D = `
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
      max-width: min(${V[L.size].width}, 100% - 40px);
    }

    .iframe__wrapper .iframe__container.expanded .iframe__app.expanded {
      max-width: 100%;
    }
  `;
  return L.style === 'popup'
    ? D
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
const V = {
  sm: { width: '400px', height: '600px' },
  md: { width: '600px', height: '800px' },
  lg: { width: '800px', height: '1000px' },
  xl: { width: '1000px', height: '1200px' },
  '2xl': { width: '1200px', height: '1400px' },
  full: { width: '100%', height: '100%' }
};
function z() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  const L = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const j =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width: L, height: j };
}
function U() {
  const L = window.location.href;
  return ['localhost', ..._].some((j) => L.includes(j)) ? '' : _[0];
}
function d(L, j) {
  const D = L.split('?')[1];
  if (!D) return null;
  const M = D.split('&').reduce((w, G) => {
    const J = G.split('=');
    return (w[decodeURIComponent(J[0])] = decodeURIComponent(J[1])), w;
  }, {});
  return j ? M[j] : M;
}
function k(L, j) {
  const D = $[L];
  const M = !q.includes(L);
  const w = j ? document.querySelector(`script[src*="${j}"]`).src : window.location.href;
  const G = d(w, L) ?? D[0];
  return M ? (D.includes(G) ? G : D[0]) : G;
}
function I(L) {
  return Object.keys($).reduce((j, D) => {
    const M = k(D, L);
    return M ? { ...j, [D]: M } : j;
  }, {});
}
function h(L) {
  const j = z();
  const D = I(L);
  return j.width < 768 && (D.state = 'collapse'), new URLSearchParams(D).toString();
}
function f(L, j, D) {
  const M = k('state', D);
  !W(M) && F(L, j);
}
async function Q(L) {
  return new Promise((j) => setTimeout(j, L));
}
function W(L) {
  return X === L;
}
function A(L) {
  return (X = L), L;
}
function F(L, j) {
  X === 'expand' ? j() : L();
}
function u(L) {
  window.parent !== window && window.parent.postMessage(A(L), '*');
}
function Y(L, j) {
  L?.contentWindow?.postMessage(A(j), '*');
}
function v(L, j, D) {
  L.addEventListener('click', () => F(j, D));
}
function O(L, j, D) {
  window.addEventListener('message', (M) => {
    M.data === 'collapse' && j(), M.data === 'expand' && L(), M.data === 'close' && D();
  });
}
function R(L) {
  document.addEventListener('click', L);
}
async function E(L) {
  const j = I(L);
  const D = document.createElement('style');
  (D.textContent = Z(j)), document.head.appendChild(D), await Q(100);
  const M = document.createElement('div');
  M.classList.add('iframe__wrapper'), (M.id = 'iframeWrapper'), document.body.appendChild(M);
  const w = document.createElement('div');
  w.classList.add('iframe__container'), (w.id = 'iframeContainer'), M.appendChild(w);
  const G = U();
  const J = h(L);
  const H = document.createElement('iframe');
  return (
    H.classList.add('iframe__app'),
    (H.id = 'iframeApp'),
    (H.allowFullscreen = !0),
    (H.src = `${G}/iframe-app?${J}`),
    w.appendChild(H),
    { iframe: H, iframeContainer: w, iframeWrapper: M }
  );
}
function x() {
  const j = { systemPrompt: I().prompt };
  return new URLSearchParams(j).toString();
}
function g() {
  const L = I();
  const j = x();
  const D = L.style === 'popup';
  const M = document.createElement('div');
  if (
    ((M.id = D ? 'popupContainer' : 'inlineContainer'),
    (M.className = D ? 'popup-container' : 'inline-container'),
    D)
  )
    document.body.appendChild(M);
  else (document.getElementById(L.inlineParentId) ?? document.body).appendChild(M);
  const w = document.createElement('iframe');
  (w.allowFullscreen = !0),
    (w.id = D ? 'popupIframe' : 'inlineIframe'),
    (w.className = D ? 'popup-iframe' : 'inline-iframe'),
    (w.src = `/external/${L.app}?${j}`),
    M.appendChild(w);
  let G = null;
  if (D)
    (G = document.createElement('button')),
      (G.id = 'toggleButton'),
      (G.className = 'toggle-button'),
      document.body.appendChild(G);
  return { iframe: w, iframeContainer: M, toggleButton: G };
}
const _ = [];
const $ = {
  inlineParentId: [''],
  style: ['popup', 'inline'],
  position: ['right', 'left'],
  state: ['collapse', 'expand'],
  prompt: ['none', 'social', 'business'],
  size: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
  app: ['chat', 'bot', 'write', 'document', 'image']
};
const q = ['inlineParentId'];
let X = 'collapse';
const C = () => {
  K.classList.add('expanded'), T.classList.add('expanded');
};
const y = () => {
  K.classList.remove('expanded'), T.classList.remove('expanded');
};
const P = () => {
  Y(K, 'close'), T.remove(), K.remove();
};
const N = (L) => {
  if (!T.contains(L.target)) Y(K, 'collapse');
};
const B = I('iframe-widget-js').style === 'popup';
const { iframe: K, iframeContainer: T } = await E('iframe-widget-js');
if (B) R(N), O(C, y, P);
