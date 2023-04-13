"use client"
import QuestionItem from './components/question-item';
import TestInfo from './components/test-info';
import { RenderIcon } from './icons';
import './styles/style.css';

export default function CreateTest() {
  const options = [{ label: "Intern", value: "Intern" }, { label: "Fresher", value: "Fresher" }, { label: "Junior", value: "Junior" }, { label: "Mid", value: "Mid" }, { label: "Senior", value: "Senior" }]

  return (
    <div className="flex flex-col items-center w-[600px] mx-auto pt-4">
      {/** TEST INFO */}
      <TestInfo options={options} />

      {/** QUESTION */}
      <QuestionItem />
      
      <div className="mt-8 mb-[59px]">
        <button type="button" className="flex items-center py-2 px-4 border border-solid border-secondary-base text-secondary-base text-15 leading-24">
          <RenderIcon name="plus" className="mr-2" />
          Add question
        </button>
      </div>
    </div>
  )
}
