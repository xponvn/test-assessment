import { CheckBox } from '@test-assessment/ui-components';
import clsx from 'clsx';
import { getPoint, getQuestionType } from '../../utils/helper';
import { QuestionItemType, QuestionType } from '../../utils/type';
import DifficultyTag from './difficulty-tag';
import Tag from './tag';
import RadioButton from '../form-base/radio-button';

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
        'border border-solid border-neutral-border w-full px-6 py-4 bg-neutral-table-header',
        className
      )}
    >
      {/** Question head */}
      <div className="flex items-center justify-between w-full">
        <p className="text-13 leading-6 font-medium font-primary text-neutral-placeholder">
          Question {index + 1}
        </p>

        <div className="flex gap-[5px]">
          <Tag>{getPoint(level)} point</Tag>
          <DifficultyTag difficulty={level} />
          <Tag type="info">{getQuestionType(type)}</Tag>
        </div>
      </div>

      {/** Question content */}
      <p className="mt-2 font-medium leading-6 text-15 text-neutral-text-primary">
        {content}
      </p>

      {/** Answers */}
      <div className="mt-4">
        {type !== QuestionType.FreeText && (
          <div className="flex flex-col gap-3">
            {answers.map((aItem, index) => {
              return (
                <div
                  key={index}
                  className={clsx('flex items-center', {
                    'text-success-border': aItem.isCorrect,
                    'text-neutral-text-primary': !aItem.isCorrect,
                  })}
                >
                  {type === QuestionType.MultipleChoice ? <CheckBox id={String(index)} checked={aItem.isCorrect} bgColor="bg-success-border" />: 
                    <RadioButton 
                      item={{ label: "", value: String(index)}} 
                      checked={aItem.isCorrect} 
                      styleVariant="style_2"
                      className="!w-fit"
                    />
                  }
                  <p className="ml-2 font-medium leading-6 text-13">
                    {aItem.content}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      
      {!disableEdit && (
        <div className="flex items-center gap-4 mt-4">
          <span
            onClick={() => onEdit && onEdit(index)}
            className="font-medium outline-none text-13 leading-24 text-primary-base cursor-pointer"
          >
            Edit
          </span>
          <span className="rotate-90 h-[1px] bg-neutral-disable min-w-[16px]"></span>
          <span
            onClick={() => onDelete && onDelete(index)}
            className="font-medium outline-none text-13 leading-24 text-error-base cursor-pointer"
          >
            Delete
          </span>
        </div>
      )}
    </div>
  );
}
