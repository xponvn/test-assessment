import React from 'react'
import { QuestionDifficulty } from '../../utils/type'
import clsx from 'clsx'

export default function DifficultyTag({ difficulty }: { difficulty: QuestionDifficulty }) {
  return (
    <div className={clsx("px-2 py-1 text-12 font-medium leading-4", {
      "bg-success": difficulty === QuestionDifficulty.Easy,
      "bg-pending": difficulty === QuestionDifficulty.Medium,
      "bg-error": difficulty === QuestionDifficulty.Hard,
    })}>
      {difficulty}
    </div>
  )
}
