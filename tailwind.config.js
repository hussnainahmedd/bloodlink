/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F7',
        paperDeep: '#F1ECE4',
        skeleton: '#EAE4DA',
        ink: '#1C1917',
        inkSoft: '#44403C',
        muted: '#78716C',
        hairline: '#E7E2DC',
        crimson: '#C8102E',
        crimsonDeep: '#A00D26',
        crimsonSoft: '#F9E8EB',
        maroon: '#22090D',
        maroonSoft: '#3A151B',
        paperOnDark: '#FAF9F7',
        mutedOnDark: '#A89E93',
        hairlineOnDark: '#40292E',
        leaf: '#166534',
        leafSoft: '#E7F1EA',
        amber: '#B45309',
        amberSoft: '#F7EDDD',
      },
      fontFamily: {
        display: ['Fraunces-Regular'],
        sans: ['Inter-Regular'],
        mono: ['PlexMono-Regular'],
      },
    },
  },
  plugins: [],
};
