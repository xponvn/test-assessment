const filterArtboard = (layerName, stylesArtboard = []) => {
  return stylesArtboard.filter((item) => item.name === layerName)[0].children;
};
module.exports.filterArtboard = filterArtboard;

const filterElements = (layerName, stylesArtboard = [], type = 'COMPONENT') => {
  return filterArtboard(layerName, stylesArtboard).filter(
    (item) => item.type === type
  );
};
module.exports.filterElements = filterElements;
const getTokens = (layerName, stylesArtboard, palette, decorator) => {
  const elements = filterElements(layerName, stylesArtboard);
  elements.map((element) => decorator(element));
  return palette;
};
module.exports.getTokens = getTokens;

const camelCase = (string) => {
  const stringUpdate = string
    .toLowerCase()
    .replace(/(?:(^.)|([-_\s]+.))/g, (match) =>
      match.charAt(match.length - 1).toUpperCase()
    );
  return stringUpdate.charAt(0).toLowerCase() + stringUpdate.substring(1);
};
module.exports.camelCase = camelCase;
const kebabCase = (string) => {
  return string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');
};
module.exports.kebabCase = kebabCase;
const trim = (str) => str.replace(/^\s+|\s+$/gm, '');
module.exports.trim = trim;
const getColor = (color) => Math.round(color * 255);
module.exports.getColor = getColor;
const rgbaGen = (r, g, b, a) => {
  return `rgba(${getColor(r)}, ${getColor(g)}, ${getColor(b)}, ${a})`;
};
module.exports.rgbaGen = rgbaGen;
const rgbaGenObject = (r, g, b, a) => {
  return { r: getColor(r), g: getColor(g), b: getColor(b), a };
};
module.exports.rgbaGenObject = rgbaGenObject;
const rgbGen = (r, g, b) => {
  const getColor = (color) => Math.round(color * 255);
  return `rgba(${getColor(r)}, ${getColor(g)}, ${getColor(b)})`;
};
module.exports.rgbGen = rgbGen;

const rgbToHex = (rgb) => {
  const hex = Number(rgb).toString(16);
  return hex.length < 2 ? `0${hex}` : hex;
};
module.exports.rgbToHex = rgbToHex;
const fullColorHex = (r, g, b) => {
  const red = rgbToHex(r);
  const green = rgbToHex(g);
  const blue = rgbToHex(b);
  return `#${red + green + blue}`;
};
module.exports.fullColorHex = fullColorHex;

const parseRGBA = (color) => {
  const { r, g, b, a } = color;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
module.exports.parseRGBA = parseRGBA;
const genShadow = (color, offset, radius) => {
  const { x, y } = offset;
  return `${x}px ${y}px ${radius}px ${parseRGBA(color)}`;
};
module.exports.genShadow = genShadow;
