import React from 'react'
type PieChartProps = {
  percent: number
}
export default function PieChart({percent}: PieChartProps) {

  return (
    <svg height="24" width="24" viewBox="0 0 20 20">
      <circle r="10" cx="10" cy="10" fill="#F3F0F5" />
      <circle r="5" cx="10" cy="10" fill="transparent"
        stroke="#AADA43"
        strokeWidth="10"
        strokeDasharray={`calc(${percent} * 31.4 / 100) 31.4`}
        transform="rotate(-90) translate(-20)" />
      <circle r="6" cx="10" cy="10" fill="white" />
    </svg>
  )
}
