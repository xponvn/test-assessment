export type UIConfig = {
  colors: ColorPalette;
  font: {
    primary: string;
  };
  fontSize?: FontSizePalette;
  stylesheets?: string[];
};

export type FontSizePalette = {
  heading48: FontSizeConfig;
  heading40: FontSizeConfig;
  heading36: FontSizeConfig;
  heading32: FontSizeConfig;
  heading28: FontSizeConfig;
  title24: FontSizeConfig;
  title20: FontSizeConfig;
  title18: FontSizeConfig;
  subtitle15: FontSizeConfig;
  subtitle13: FontSizeConfig;
  body15: FontSizeConfig;
  body13: FontSizeConfig;
  cation12: FontSizeConfig;
  cation10: FontSizeConfig;
  cation8: FontSizeConfig;
}

export type FontSizeConfig = {
  size: string;
  lineHeight: string;
  letterSpacing?: string
};


export type ColorPalette = {
  primary: ColorPaletteConfig;
  secondary: ColorPaletteConfig;
  neutral: ColorPaletteConfig;
  pending: ColorPaletteConfig;
  error: ColorPaletteConfig;
  success: ColorPaletteConfig;
};

export type ColorPaletteConfig = {
  default: string;
  _50?: string;
  _100?: string;
  _200?: string;
  _300?: string;
  _400?: string;
  _500?: string;
  _600?: string;
  _700?: string;
  _800?: string;
  _900?: string;
};
