import React from 'react'
import { QuestionLevel } from '../../utils/type'
import clsx from 'clsx'

export default function DifficultyTag({ difficulty }: { difficulty: QuestionLevel }) {
  return (
    <div className={clsx("px-2 py-1 text-12 font-medium leading-4 capitalize", {
      "bg-success": difficulty === QuestionLevel.Easy,
      "bg-pending": difficulty === QuestionLevel.Medium,
      "bg-error": difficulty === QuestionLevel.Hard,
    })}>
      {difficulty}
    </div>
  )
}
