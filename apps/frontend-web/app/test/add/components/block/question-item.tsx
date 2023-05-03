import { Icon } from '@test-assessment/ui-components';
import clsx from 'clsx';
import { getPoint, getQuestionType } from '../../utils/helper';
import { QuestionItemType, QuestionType } from '../../utils/type';
import DifficultyTag from './difficulty-tag';

export type QuestionItemProps = {
  data: QuestionItemType;
  index: number;
  className?: string;
  disableEdit?: boolean;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
};
export default function QuestionItem({
  data,
  index,
  className,
  disableEdit,
  onEdit,
  onDelete,
}: QuestionItemProps) {
  const { level, content, answers, type } = data;

  return (
    <div
      className={clsx(
        'border border-solid border-neutral-divider w-full',
        className
      )}
    >
      {/** Question head */}
      <div className="px-6 py-4 bg-neutral-table-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="font-medium text-neutral-text-primary text-13 leading-24">
              Question {index + 1}
            </p>
            <span className="mx-1 text-neutral-placeholder text-13 leading-20">
              ({getPoint(level)} point)
            </span>
            <DifficultyTag difficulty={level} />
          </div>
          {!disableEdit && (
            <div className="flex items-center">
              <span
                onClick={() => onEdit && onEdit(index)}
                className="border border-solid border-primary-base cursor-pointer text-primary-base rounded-[2px] w-6 h-6 flex items-center justify-center mr-2"
              >
                <Icon name="edit" />
              </span>
              <span
                onClick={() => onDelete && onDelete(index)}
                className="flex items-center justify-center w-6 h-6 cursor-pointer text-error-base"
              >
                <Icon name="remove" />
              </span>
            </div>
          )}
        </div>
        <p className="mt-2 font-medium leading-6 text-15 text-neutral-text-primary">
          {content}
        </p>
      </div>

      {/** Answers */}
      <div className="px-6 py-4 border-t border-solid border-neutral-divider bg-neutral-white">
        <div className="flex leading-5 text-neutral-text-secondary text-13">
          Type of answer:{' '}
          <span className="ml-1 font-medium capitalize text-neutral-text-primary">
            {getQuestionType(type)}
          </span>
        </div>
        {type !== QuestionType.FreeText && (
          <div className="flex flex-col gap-2 mt-4">
            {answers.map((aItem, index) => {
              return (
                <div
                  key={index}
                  className={clsx('flex items-center', {
                    'text-success-border': aItem.isCorrect,
                    'text-neutral-text-primary': !aItem.isCorrect,
                  })}
                >
                  <span className="leading-5 text-13">Answer {index + 1}:</span>
                  <p className="ml-2 font-medium leading-5 text-13">
                    {aItem.content}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
