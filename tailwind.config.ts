import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { fontFamily, height, width } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true
  },
  darkMode: ['class'],
  content: [
    './index.html',
    './content/**/*.{md,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    {
      pattern: /^(bottom-)/
    }
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      brightness: {
        25: '.25',
        50: '.50',
        55: '.55',
        60: '.60',
        65: '.65',
        70: '.70',
        75: '.75',
        80: '.80',
        85: '.85'
      },
      colors: {
        pulse: 'hsl(var(--pulse))',
        ring: 'hsl(var(--ring))',
        input: 'hsl(var(--input))',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      fontFamily: {
        mono: ['var(--font-mono)', ...fontFamily.mono],
        mont: ['var(--font-mont)', ...fontFamily.sans],
        lora: ['var(--font-lora)', ...fontFamily.serif],
        paris: ['var(--font-paris)', ...fontFamily.serif],
        'mont-alt': ['var(--font-mont-alt)', ...fontFamily.sans],
        sans: ['var(--font-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
        display: ['var(--font-sf)', 'system-ui', 'sans-serif'],
        default: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      borderWidth: {
        DEFAULT: '1px',
        0: '0',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px'
      },
      minHeight: {
        ...height
      },
      minWidth: {
        ...width
      }
    },
    animation: {
      bounce: 'bounce 1s infinite',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      // Fade up and down
      'fade-up': 'fade-up 0.5s',
      'fade-down': 'fade-down 0.5s',
      // Tooltip
      'slide-up-fade': 'slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-down-fade': 'slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out'
    },
    keyframes: {
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' }
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
        },
        '50%': {
          transform: 'translateY(0)',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
        }
      },
      ping: {
        '75%, 100%': { transform: 'scale(2)', opacity: 0 }
      },
      pulse: {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 }
      },
      // Fade up and down
      'fade-up': {
        '0%': {
          opacity: 0,
          transform: 'translateY(10px)'
        },
        '80%': {
          opacity: 0.6
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0px)'
        }
      },
      'fade-down': {
        '0%': {
          opacity: 0,
          transform: 'translateY(-10px)'
        },
        '80%': {
          opacity: 0.6
        },
        '100%': {
          opacity: 1,
          transform: 'translateY(0px)'
        }
      },
      // Tooltip
      'slide-up-fade': {
        '0%': { opacity: 0, transform: 'translateY(6px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' }
      },
      'slide-down-fade': {
        '0%': { opacity: 0, transform: 'translateY(-6px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' }
      },
      'accordion-down': {
        from: { height: 0 },
        to: { height: 'var(--radix-accordion-content-height)' }
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: 0 }
      }
    }
  },
  plugins: [
    forms,
    animate,
    typography,
    aspectRatio,
    containerQueries,
    plugin((plugin) => {
      plugin.addVariant('radix-side-top', '&[data-side="top"]');
      plugin.addVariant('radix-side-bottom', '&[data-side="bottom"]');
    })
  ]
};
