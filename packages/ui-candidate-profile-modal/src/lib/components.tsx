export interface DualColumnRowProps {
  firstCol: React.ReactElement;
  secondCol: React.ReactElement;
}
export const DualColumnRow = ({ firstCol, secondCol }: DualColumnRowProps) => (
  <div className="flex mb-4">
    <div className="flex-1 mr-1">{firstCol}</div>
    <div className="flex-1">{secondCol}</div>
  </div>
);

export interface RowProps extends React.PropsWithChildren {
  noMargin?: boolean;
}
export const Row = ({ children, noMargin }: RowProps) => (
  <div className={noMargin ? '' : 'mb-4'}>{children}</div>
);
