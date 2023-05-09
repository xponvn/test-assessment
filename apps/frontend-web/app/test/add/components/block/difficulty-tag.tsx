import React from 'react'
import { QuestionLevel } from '../../utils/type'
import Tag from './tag'

export default function DifficultyTag({ difficulty }: { difficulty: QuestionLevel }) {
  const getType = () => {
    if (difficulty === QuestionLevel.Easy) {
      return "success";
    } else if (difficulty === QuestionLevel.Medium) {
      return "pending"
    } else {
      return "error"
    }
  }
  return <Tag type={getType()}>{difficulty}</Tag>
}
