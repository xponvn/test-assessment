import { paths } from './paths';

interface Props {
  name: string;
  width: number;
  height: number;
  color?: string;
  viewBox?: string;
  onClick?: () => void;
}

export const Icon = ({
  name,
  width,
  height,
  viewBox = '0 0 24 24',
  color,
  onClick,
}: Props) => {
  const svgStyle =
    paths[name].type === 'stroke'
      ? { stroke: 'currentColor', fill: 'none' }
      : { fill: 'currentColor' };

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
