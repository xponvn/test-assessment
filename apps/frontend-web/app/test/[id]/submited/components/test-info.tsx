import React from 'react'

type TestInfoProps = {
  testName: string;
  position: string;
  level: string;
  timeLimit: number;
  passingScore: number;
}

export default function TestInfo({ position, level, timeLimit, passingScore, testName }: TestInfoProps) {
  return (
    <div>
      <p className="text-32 font-semibold">{testName}</p>
      <div className="flex flex-wrap gap-12 mt-2">
        <div className="text-13 font-medium">Job position: {position}</div>
        <div className="text-13 font-medium">Level: {level}</div>
        <div className="text-13 font-medium">Set time limit: {timeLimit} min </div>
        <div className="text-13 font-medium">Passing score: {passingScore}/100 ({passingScore}%)</div>
      </div>
    </div>
  )
}
