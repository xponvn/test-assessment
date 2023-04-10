import React, { createContext, useCallback, useState } from 'react';
import { UIConfig } from '.';

export const getStyle = (uiConfig: UIConfig) => {
  const fontSize = uiConfig.fontSize;
  let configStyle: any = {
    // --- COLOR ---
    // Primary Color
    '--color-primary': uiConfig.colors.primary.default,
    '--color-primary-bg': uiConfig.colors.primary._50,
    '--color-primary-hover': uiConfig.colors.primary._600,
    '--color-primary-base': uiConfig.colors.primary._700,
    '--color-primary-clicked': uiConfig.colors.primary._800,

    // Secondary Color
    '--color-secondary': uiConfig.colors.secondary.default,
    '--color-secondary-bg': uiConfig.colors.secondary._50,
    '--color-secondary-hover': uiConfig.colors.secondary._600,
    '--color-secondary-base': uiConfig.colors.secondary._700,
    '--color-secondary-clicked': uiConfig.colors.secondary._800,

    // Neutral Color
    '--color-neutral': uiConfig.colors.neutral.default,
    '--color-neutral-white': uiConfig.colors.neutral._50,
    '--color-neutral-table-header': uiConfig.colors.neutral._100,
    '--color-neutral-bg': uiConfig.colors.neutral._200,
    '--color-neutral-divider': uiConfig.colors.neutral._300,
    '--color-neutral-disable': uiConfig.colors.neutral._400,
    '--color-neutral-border': uiConfig.colors.neutral._500,
    '--color-neutral-placeholder': uiConfig.colors.neutral._600,
    '--color-neutral-text-secondary': uiConfig.colors.neutral._700,
    '--color-neutral-text-primary': uiConfig.colors.neutral._800,
    '--color-neutral-black': uiConfig.colors.neutral._900,

    // Pending Color
    '--color-pending': uiConfig.colors.pending.default,
    '--color-pending-bg': uiConfig.colors.pending._50,
    '--color-pending-base': uiConfig.colors.pending._700,
    '--color-pending-border': uiConfig.colors.pending._800,

    // Error Color
    '--color-error': uiConfig.colors.error.default,
    '--color-error-bg': uiConfig.colors.error._50,
    '--color-error-base': uiConfig.colors.error._700,
    '--color-error-border': uiConfig.colors.error._800,

    // Success Color
    '--color-success': uiConfig.colors.success.default,
    '--color-success-bg': uiConfig.colors.success._50,
    '--color-success-base': uiConfig.colors.success._700,
    '--color-success-border': uiConfig.colors.success._800,

    // --- FONT ---
    '--font-primary': uiConfig.font.primary,
  };

  // --- FONT SIZE ---
  if (fontSize) {
    configStyle = {
      ...configStyle,
      '--heading-48': [
        fontSize.heading48.size,
        { lineHeight: fontSize.heading48.lineHeight },
      ],
      '--heading-40': [
        fontSize.heading40.size,
        { lineHeight: fontSize.heading40.lineHeight },
      ],
      '--heading-36': [
        fontSize.heading36.size,
        { lineHeight: fontSize.heading36.lineHeight },
      ],
      '--heading-32': [
        fontSize.heading32.size,
        { lineHeight: fontSize.heading32.lineHeight },
      ],
      '--heading-28': [
        fontSize.heading28.size,
        { lineHeight: fontSize.heading28.lineHeight },
      ],
      '--title-24': [
        fontSize.title24.size,
        { lineHeight: fontSize.title24.lineHeight },
      ],
      '--title-20': [
        fontSize.title20.size,
        { lineHeight: fontSize.title20.lineHeight },
      ],
      '--title-18': [
        fontSize.title18.size,
        { lineHeight: fontSize.title18.lineHeight },
      ],
      '--subtitle-15': [
        fontSize.subtitle15.size,
        { lineHeight: fontSize.subtitle15.lineHeight },
      ],
      '--subtitle-13': [
        fontSize.subtitle13.size,
        { lineHeight: fontSize.subtitle13.lineHeight },
      ],
      '--body-15': [
        fontSize.body15.size,
        { lineHeight: fontSize.body15.lineHeight },
      ],
      '--body-13': [
        fontSize.body13.size,
        { lineHeight: fontSize.body13.lineHeight },
      ],
      '--cation-12': [
        fontSize.cation12.size,
        { lineHeight: fontSize.cation12.lineHeight },
      ],
      '--cation-10': [
        fontSize.cation10.size,
        { lineHeight: fontSize.cation10.lineHeight },
      ],
      '--cation-8': [
        fontSize.cation8.size,
        { lineHeight: fontSize.cation8.lineHeight },
      ],
    };
  }

  return configStyle;
};

export type UIContextType = {
  theme: UIConfig;
  setTheme: (_theme: Partial<UIConfig>) => void;
};

const initState: UIContextType = {
  theme: {
    colors: {
      primary: {
        default: '',
      },
      secondary: {
        default: '',
      },
      neutral: {
        default: '',
      },
      pending: {
        default: '',
      },
      error: {
        default: '',
      },
      success: {
        default: '',
      },
    },
    font: {
      primary: 'sans-serif, serif, monospace, cursive',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: (_theme: Partial<UIConfig>) => {},
};
const UIContext = createContext<UIContextType>(initState);

export type ThemeProviderProps = {
  config: UIConfig;
  children: JSX.Element | React.ReactNode;
};

export function UIProvider(props: ThemeProviderProps) {
  const [theme, setThemeState] = useState<UIConfig>(props.config);

  const setTheme = useCallback((newTheme: Partial<UIConfig>) => {
    setThemeState((theme) => ({ ...theme, ...newTheme }));
  }, []);

  return (
    <UIContext.Provider value={{ theme, setTheme }}>
      <main style={getStyle(theme)} className="h-screen">
        {theme?.stylesheets?.map((stylesheet, index) => (
          <link key={index} rel="stylesheet" href={stylesheet} />
        ))}
        {props.children}
      </main>
    </UIContext.Provider>
  );
}

export const useUI = () => React.useContext(UIContext);
