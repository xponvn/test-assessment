const createTWConfig = ({ content = [] } = {}) => {
  return {
    darkMode: 'class',
    content: [...content],
    theme: {
      extend: {
        lineHeight: {
          64: 'var(--lineHeigh-64)',
          56: 'var(--lineHeigh-56)',
          48: 'var(--lineHeigh-48)',
          40: 'var(--lineHeigh-40)',
          32: 'var(--lineHeigh-32)',
          24: 'var(--lineHeigh-24)',
          20: 'var(--lineHeigh-20)',
          16: 'var(--lineHeigh-16)',
          12: 'var(--lineHeigh-12)',
        },
      },
      colors: {
        // default
        inherit: 'inherit',
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',

        // theme
        primary: {
          DEFAULT: 'var(--color-primary)',
          background: 'var(--color-primary-bg)',
          hover: 'var(--color-primary-hover)',
          base: 'var(--color-primary-base)',
          clicked: 'var(--color-primary-clicked)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          background: 'var(--color-secondary-bg)',
          hover: 'var(--color-secondary-hover)',
          base: 'var(--color-secondary-base)',
          clicked: 'var(--color-secondary-clicked)',
        },
        neutral: {
          DEFAULT: 'var(--color-neutral)',
          white: 'var(--color-neutral-white)',
          'table-header': 'var(--color-neutral-table-header)',
          bg: 'var(--color-neutral-bg)',
          divider: 'var(--color-neutral-divider)',
          disable: 'var(--color-neutral-disable)',
          border: 'var(--color-neutral-border)',
          placeholder: 'var(--color-neutral-placeholder)',
          'text-secondary': 'var(--color-neutral-text-secondary)',
          'text-primary': 'var(--color-neutral-text-primary)',
          black: 'var(--color-neutral-black)',
        },
        pending: {
          DEFAULT: 'var(--color-pending)',
          bg: 'var(--color-pending-bg)',
          base: 'var(--color-pending-base)',
          border: 'var(--color-pending-border)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          bg: 'var(--color-error-bg)',
          base: 'var(--color-error-base)',
          border: 'var(--color-error-border)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          bg: 'var(--color-success-bg)',
          base: 'var(--color-success-base)',
          border: 'var(--color-success-border)',
        },
      },
      fontSize: {
        48: 'var(--size-48)',
        40: 'var(--size-40)',
        36: 'var(--size-36)',
        32: 'var(--size-32)',
        28: 'var(--size-28)',
        24: 'var(--size-24)',
        20: 'var(--size-20)',
        18: 'var(--size-18)',
        15: 'var(--size-15)',
        13: 'var(--size-13)',
        12: 'var(--size-12)',
        10: 'var(--size-10)',
        8: 'var(--size-8)',
      },
      fontFamily: {
        primary: 'var(--font-primary)',
      },
    },
    plugins: [],
  };
};

const createPostCssConfig = ({ tailwindcss }) => ({
  plugins: {
    tailwindcss,
    autoprefixer: {},
  },
});

module.exports = {
  createTWConfig,
  createPostCssConfig,
};
