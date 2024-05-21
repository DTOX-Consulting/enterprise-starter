function Z(j) {
  const R = `
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
      ${j.position === 'right' ? 'right: 20px;' : 'left: 20px;'}
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
      max-width: min(${M[j.size].width}, 100% - 40px);
    }

    .iframe__wrapper .iframe__container.expanded .iframe__app.expanded {
      max-width: 100%;
    }
  `;
  return j.style === 'popup'
    ? R
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
const M = {
  sm: { width: '400px', height: '600px' },
  md: { width: '600px', height: '800px' },
  lg: { width: '800px', height: '1000px' },
  xl: { width: '1000px', height: '1200px' },
  '2xl': { width: '1200px', height: '1400px' },
  full: { width: '100%', height: '100%' }
};
function I() {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  const j = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const k =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width: j, height: k };
}
function O() {
  const j = window.location.href;
  return ['localhost', ...$].some((k) => j.includes(k)) ? '' : $[0];
}
function U(j, k) {
  const R = j.split('?')[1];
  if (!R) return null;
  const _ = R.split('&').reduce((h, G) => {
    const K = G.split('=');
    return (h[decodeURIComponent(K[0])] = decodeURIComponent(K[1])), h;
  }, {});
  return k ? _[k] : _;
}
function D(j, k) {
  const R = A[j];
  const _ = !q.includes(j);
  const h = k ? document.querySelector(`script[src*="${k}"]`).src : window.location.href;
  const G = U(h, j) ?? R[0];
  return _ ? (R.includes(G) ? G : R[0]) : G;
}
function J(j) {
  return Object.keys(A).reduce((k, R) => {
    const _ = D(R, j);
    return _ ? { ...k, [R]: _ } : k;
  }, {});
}
function Q(j) {
  const k = I();
  const R = J(j);
  return k.width < 768 && (R.state = 'collapse'), new URLSearchParams(R).toString();
}
function v(j, k, R) {
  const _ = D('state', R);
  !B(_) && F(j, k);
}
async function W(j) {
  return new Promise((k) => setTimeout(k, j));
}
function B(j) {
  return X === j;
}
function E(j) {
  return (X = j), j;
}
function F(j, k) {
  X === 'expand' ? k() : j();
}
function u(j) {
  window.parent !== window && window.parent.postMessage(E(j), '*');
}
function Y(j, k) {
  j?.contentWindow?.postMessage(E(k), '*');
}
function g(j, k, R) {
  j.addEventListener('click', () => F(k, R));
}
function V(j, k, R) {
  window.addEventListener('message', (_) => {
    _.data === 'collapse' && k(), _.data === 'expand' && j(), _.data === 'close' && R();
  });
}
function w(j) {
  document.addEventListener('click', j);
}
async function z(j) {
  const k = J(j);
  const R = document.createElement('style');
  (R.textContent = Z(k)), document.head.appendChild(R), await W(100);
  const _ = document.createElement('div');
  _.classList.add('iframe__wrapper'), (_.id = 'iframeWrapper'), document.body.appendChild(_);
  const h = document.createElement('div');
  h.classList.add('iframe__container'), (h.id = 'iframeContainer'), _.appendChild(h);
  const G = O();
  const K = Q(j);
  const H = document.createElement('iframe');
  return (
    H.classList.add('iframe__app'),
    (H.id = 'iframeApp'),
    (H.allowFullscreen = !0),
    (H.src = `${G}/iframe-app?${K}`),
    h.appendChild(H),
    { iframe: H, iframeContainer: h, iframeWrapper: _ }
  );
}
function x() {
  const k = { systemPrompt: J().prompt };
  return new URLSearchParams(k).toString();
}
function f() {
  const j = J();
  const k = x();
  const R = j.style === 'popup';
  const _ = document.createElement('div');
  if (
    ((_.id = R ? 'popupContainer' : 'inlineContainer'),
    (_.className = R ? 'popup-container' : 'inline-container'),
    R)
  )
    document.body.appendChild(_);
  else (document.getElementById(j.inlineParentId) ?? document.body).appendChild(_);
  const h = document.createElement('iframe');
  (h.allowFullscreen = !0),
    (h.id = R ? 'popupIframe' : 'inlineIframe'),
    (h.className = R ? 'popup-iframe' : 'inline-iframe'),
    (h.src = `/external/${j.app}?${k}`),
    _.appendChild(h);
  let G = null;
  if (R)
    (G = document.createElement('button')),
      (G.id = 'toggleButton'),
      (G.className = 'toggle-button'),
      document.body.appendChild(G);
  return { iframe: h, iframeContainer: _, toggleButton: G };
}
const $ = ['https://pulseline-app.vercel.app', 'https://app.pulseline.io'];
const A = {
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
const N = () => {
  L.classList.add('expanded'), T.classList.add('expanded');
};
const C = () => {
  L.classList.remove('expanded'), T.classList.remove('expanded');
};
const b = () => {
  Y(L, 'close'), T.remove(), L.remove();
};
const P = (j) => {
  if (!T.contains(j.target)) Y(L, 'collapse');
};
const y = J('iframe-widget-js').style === 'popup';
const { iframe: L, iframeContainer: T } = await z('iframe-widget-js');
if (y) w(P), V(N, C, b);
