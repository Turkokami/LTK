import type { Config } from 'tailwindcss';

/**
 * Colour and type live in app/globals.css as CSS custom properties (the label system).
 * These aliases exist so utilities can reach them. Never add a raw hex here.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stock: 'var(--stock)',
        stock2: 'var(--stock-2)',
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        ink2: 'var(--ink-2)',
        ink3: 'var(--ink-3)',
        rule: 'var(--rule)',
        danger: 'var(--signal-danger)',
        warning: 'var(--signal-warning)',
        field: 'var(--field)',
        field2: 'var(--field-2)',
        fieldTint: 'var(--field-tint)',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: { measure: 'var(--measure)' },
    },
  },
  plugins: [],
};
export default config;
