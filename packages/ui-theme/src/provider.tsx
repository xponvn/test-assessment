import React, { createContext, useCallback, useState } from 'react';
import { UIConfig } from '.';

export const getStyle = (uiConfig: UIConfig) => {
  const fontSize = uiConfig.fontSize;
  const lineHeight = uiConfig.lineHeight;

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
      '--size-48': fontSize._48,
      '--size-40': fontSize._40,
      '--size-36': fontSize._36,
      '--size-32': fontSize._32,
      '--size-28': fontSize._28,
      '--size-24': fontSize._24,
      '--size-20': fontSize._20,
      '--size-18': fontSize._18,
      '--size-15': fontSize._15,
      '--size-13': fontSize._13,
      '--size-12': fontSize._12,
      '--size-10': fontSize._10,
      '--size-8': fontSize._8,
    };
  }

  if(lineHeight) {
    configStyle = {
      ...configStyle,
      '--lineHeigh-64': lineHeight._64,
      '--lineHeigh-56': lineHeight._56,
      '--lineHeigh-48': lineHeight._48,
      '--lineHeigh-40': lineHeight._40,
      '--lineHeigh-32': lineHeight._32,
      '--lineHeigh-24': lineHeight._24,
      '--lineHeigh-20': lineHeight._20,
      '--lineHeigh-16': lineHeight._16,
      '--lineHeigh-12': lineHeight._12,
    }
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
