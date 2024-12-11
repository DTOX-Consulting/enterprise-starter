import {
  Lora,
  Inter,
  Montserrat,
  Parisienne,
  JetBrains_Mono,
  Montserrat_Alternates
} from 'next/font/google';
import localFont from 'next/font/local';

export const fontSFPro = localFont({
  src: './SF-Pro-Display-Medium.otf',
  variable: '--font-sf'
});

export const fontLora = Lora({
  subsets: ['latin'],
  variable: '--font-lora'
});

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const fontMont = Montserrat({
  subsets: ['latin'],
  variable: '--font-mont'
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const fontParis = Parisienne({
  subsets: ['latin'],
  variable: '--font-paris',
  weight: ['400']
});

export const fontMontAlt = Montserrat_Alternates({
  subsets: ['latin'],
  variable: '--font-mont-alt',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
