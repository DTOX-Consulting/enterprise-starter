const sizes = {
  sm: {
    width: '400px',
    height: '600px'
  },
  md: {
    width: '600px',
    height: '800px'
  },
  lg: {
    width: '800px',
    height: '1000px'
  },
  xl: {
    width: '1000px',
    height: '1200px'
  },
  '2xl': {
    width: '1200px',
    height: '1400px'
  },
  full: {
    width: '100%',
    height: '100%'
  }
};

/**
 *
 *
 * @export
 * @param params {Record<string, string>}
 * @returns {*}
 */
export function getWidgetStyle(params) {
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
      ${params.position === 'right' ? 'right: 20px;' : 'left: 20px;'}
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

  return params.style === 'popup' ? popup : inline;
}
