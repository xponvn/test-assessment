import { paths } from './paths';

export const getIconNames = (type?: 'stroke' | 'fill') => {
  if (!type) {
    return Object.keys(paths).filter((name) => {
      return paths[name].isColor;
    });
  }
  return Object.keys(paths).filter((name) => {
    return paths[name].type === type && !paths[name].isColor;
  });
};

interface Props {
  name: string;
  width: number;
  height: number;
  color?: string;
  viewBox?: '0 0 24 24' | '0 0 32 24';
  onClick?: () => void;
}

export const Icon = ({
  name,
  width = 24,
  height = 24,
  viewBox = '0 0 24 24',
  color = 'currentColor',
  onClick,
}: Props) => {
  const svgStyle =
    paths[name].type === 'stroke' ? { fill: 'none' } : { fill: 'currentColor' };

  return (
    <div className={`inline-block ${color}`} onClick={onClick}>
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        style={svgStyle}
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths[name].path}
      </svg>
    </div>
  );
};
