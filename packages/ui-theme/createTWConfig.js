const path = require('path')

exports.createTWConfig = (config) => {
  const content = config?.content || []
  return {
    darkMode: 'class',
    content: [...content],
    theme: {
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
          'background': 'var(--color-primary-bg)',
          'hover': 'var(--color-primary-hover)',
          'base': 'var(--color-primary-base)',
          'clicked': 'var(--color-primary-clicked)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          'background': 'var(--color-secondary-bg)',
          'hover': 'var(--color-secondary-hover)',
          'base': 'var(--color-secondary-base)',
          'clicked': 'var(--color-secondary-clicked)',
        },
        neutral: {
          DEFAULT: 'var(--color-neutral)',
          'white': 'var(--color-neutral-white)',
          'table-header': 'var(--color-neutral-table-header)',
          'table-bg': 'var(--color-neutral-table-bg)',
          'table-divider': 'var(--color-neutral-table-divider)',
          'table-disable': 'var(--color-neutral-table-disable)',
          'table-border': 'var(--color-neutral-table-border)',
          'table-placeholder': 'var(--color-neutral-table-placeholder)',
          'table-text-secondary': 'var(--color-neutral-table-text-secondary)',
          'table-text-primary': 'var(--color-neutral-table-text-primary)',
          'table-black': 'var(--color-neutral-table-black)',
        },
        pending: {
          DEFAULT: 'var(--color-pending)',
          'bg': 'var(--color-pending-bg)',
          'base': 'var(--color-pending-base)',
          'border': 'var(--color-pending-border)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          'bg': 'var(--color-error-bg)',
          'base': 'var(--color-error-base)',
          'border': 'var(--color-error-border)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          'bg': 'var(--color-success-bg)',
          'base': 'var(--color-success-base)',
          'border': 'var(--color-success-border)',
        },
      },
      // fontSize: {
      //   'heading48': 'var(--heading-48)',
      //   'heading40': 'var(--heading-40)',
      //   'heading36': 'var(--heading-36)',
      //   'heading32': 'var(--heading-32)',
      //   'heading28': 'var(--heading-28)',
      //   'title24': 'var(--title-24)',
      //   'title20': 'var(--title-20)',
      //   'title18': 'var(--title-18)',
      //   'subtitle15': 'var(--subtitle-15)',
      //   'subtitle13': 'var(--subtitle-13)',
      //   'body15': 'var(--body-15)',
      //   'body13': 'var(--body-13)',
      //   'cation12': 'var(--cation-12)',
      //   'cation10': 'var(--cation-10)',
      //   'cation8': 'var(--cation-8)',
      // },
      fontFamily: {
        primary: 'var(--font-primary)'
      },
    },
    plugins: [],
  }
}

exports.getToken = () => {
  console.log("path:", path)
  return {
    ...path
  }
};