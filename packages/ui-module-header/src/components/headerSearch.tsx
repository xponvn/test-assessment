import { Button, Input } from '@test-assessment/ui-components';
import { HeaderSearchProps } from '../types';

export const HeaderSearch = (props: HeaderSearchProps) => {
  const {
    title,
    searchPlaceholder,
    score,
    primaryButton,
    secondaryButton,
    thirdButton,
  } = props;
  const styles = useStyles();

  return (
    <div className={`${styles.root}`}>
      <div className={`${styles.title}`}>{title}</div>
      <div className={`${styles.searchWrap}`}>
        <Input type="search" placeholder={searchPlaceholder} />
        {!isNaN(Number(score)) && (
          <div className={`${styles.score}`}>
            <span className={`${styles.scoreLabel}`}>Total point:</span>
            <span className={`${styles.scoreValue}`}>
              {score} point{score && score > 1 ? 's' : ''}
            </span>
          </div>
        )}
        <span className={`${styles.separate}`}>|</span>
        {thirdButton && (
          <Button
            variant="secondaryDark"
            type="button"
            onClick={thirdButton.onClick}
            className="text-neutral-white"
          >
            {thirdButton.text}
          </Button>
        )}
        <Button
          variant="secondaryDark"
          type="button"
          onClick={secondaryButton.onClick}
          className="text-neutral-white"
        >
          {secondaryButton.text}
        </Button>
        <Button variant="primary" type="button" onClick={primaryButton.onClick}>
          {primaryButton.text}
        </Button>
      </div>
    </div>
  );
};

const useStyles = () => {
  return {
    root: `flex justify-between items-center`,
    title: `text-neutral-white font-bold text-24`,
    searchWrap: `flex flex-wrap items-center gap-4`,
    score: 'text-15 font-medium',
    scoreLabel: 'text-neutral-border mr-2',
    scoreValue: 'text-neutral-white',
    separate: `text-neutral-placeholder`,
  };
};
