import React from 'react'
import { QuestionItemType, QuestionType } from '../../utils/type'
import { getAnswerCorrect, getPoint, getQuestionType } from '../../utils/helper';
import DifficultyTag from './difficulty-tag';
import clsx from 'clsx';
import { Icon } from '@test-assessment/ui-components';

export type QuestionItemProps = {
  data: QuestionItemType;
  index: number;
  className?: string;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}
export default function QuestionItem({ data, index, className, onEdit, onDelete }: QuestionItemProps) {
  const { level, content, answers, type, correctAnswer } = data;

  return (
    <div className={clsx("border border-solid border-neutral-divider w-full", className)}>
      {/** Question head */}
      <div className="px-6 py-4 bg-neutral-table-header">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <p className="text-neutral-text-primary text-13 font-medium leading-24">Question {index + 1}</p>
            <span className="text-neutral-placeholder text-13 leading-20 mx-1">({getPoint(level)} point)</span>
            <DifficultyTag difficulty={level} />
          </div>
          <div className="flex items-center">
            <span
              onClick={() => onEdit && onEdit(index)}
              className="border border-solid border-primary-base cursor-pointer text-primary-base rounded-[2px] w-6 h-6 flex items-center justify-center mr-2">
              <Icon name="edit" />
            </span>
            <span
              onClick={() => onDelete && onDelete(index)}
              className="cursor-pointer text-error-base flex w-6 h-6 items-center justify-center">
              <Icon name="remove" />
            </span>
          </div>
        </div>
        <p className="mt-2 text-15 font-medium leading-6 text-neutral-text-primary">{content}</p>
      </div>

      {/** Answers */}
      <div className="border-t border-solid border-neutral-divider px-6 py-4 bg-neutral-white">
        <div className="flex text-neutral-text-secondary leading-5 text-13">Type of answer: <span className="text-neutral-text-primary ml-1 font-medium capitalize">{getQuestionType(type)}</span></div>
        {type !== QuestionType.FreeText && <div className="mt-4 flex flex-col gap-2">
          {answers.map((aItem, index) => {
            return <div key={index} className={clsx("flex items-center", {
              "text-success-border": getAnswerCorrect(type, correctAnswer).includes(index),
              "text-neutral-text-primary": !getAnswerCorrect(type, correctAnswer).includes(index)
            })}>
              <span className="leading-5 text-13">Answer {index + 1}:</span>
              <p className="leading-5 text-13 font-medium ml-2">{aItem.content}</p>
            </div>
          })}
        </div>}
      </div>
    </div>
  )
}
