import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'p3y-red': '#ff5e5b',
      'p3y-grey': '#d8d8d8',
      'p3y-ivory': '#ffffea',
      'p3y-blue': '#00cecb',
      'p3y-maize': '#ffed66',
      'p3y-gunmetal': '#2a2d34',
      'p3y-olive': '#41463D',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
