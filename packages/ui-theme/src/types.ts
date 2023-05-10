export type UIConfig = {
  colors: ColorPalette;
  font: {
    primary: string;
  };
  fontSize?: FontSizeConfig;
  lineHeight?: LineHeightConfig;
  stylesheets?: string[];
};

export type LineHeightConfig = {
  _64: string;
  _56: string;
  _48: string;
  _40: string;
  _32: string;
  _24: string;
  _20: string;
  _16: string;
  _12: string;
};

export type FontSizeConfig = {
  _48: string;
  _40: string;
  _36: string;
  _32: string;
  _28: string;
  _24: string;
  _20: string;
  _18: string;
  _15: string;
  _13: string;
  _12: string;
  _10: string;
  _8: string;
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
  transparent?: string;
};
