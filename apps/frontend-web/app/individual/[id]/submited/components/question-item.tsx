"use client"
import { Icon } from '@test-assessment/ui-components';
import clsx from 'clsx';
import React from 'react'

type QuestionItemProps = {
  label: string;
  content: string;
  level: string;
  answers: { content: string, isCorrect: boolean }[]
  className?: string
}

export default function QuestionItem({ label, content, level, answers, className }: QuestionItemProps) {
  const getQuestionType = (answers: { content: string, isCorrect: boolean }[]) => {
    if(answers.length <= 0) return "Free text";
    const answerIsCorrect = answers.filter(x => x.isCorrect === true);
    if(answerIsCorrect.length > 1) return "Multiple choice";
    return "Single choice"
  };

  return (
    <div className={clsx(className)}>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-32 font-semibold">{label}</p>
          <div className="py-2 px-3 bg-[#D9D9D9] text-13 font-bold capitalize">{level}</div>
          <div className="py-2 px-3 bg-[#D9D9D9] text-13 font-bold">{getQuestionType(answers)}</div>
        </div>
        <p className="text-20 font-bold mt-3">{content}</p>
      </div>
      <div className="mt-8">
        {answers.map((item, index) => (
          <div key={index} className="flex items-center mb-8 last:mb-0">
            <div className={clsx("w-6 h-6 flex items-center justify-center rounded-full bg-black text-white mr-7",{
              "opacity-0": !item.isCorrect,
              "opacity-100": item.isCorrect
            })}>
              <Icon name="check" />
            </div>
            <p className="text-18">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
