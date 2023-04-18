"use client"
import FormQuestionItem from './components/block/form-question-item';
import QuestionItem from './components/block/question-item';
import TestInfo from './components/block/test-info';
import { RenderIcon } from './icons';
import './styles/style.css';
import { useCreateTest } from './utils/provider';

export default function CreateTest() {
  const options = [{ label: "Intern", value: "Intern" }, { label: "Fresher", value: "Fresher" }, { label: "Junior", value: "Junior" }, { label: "Mid", value: "Mid" }, { label: "Senior", value: "Senior" }]
  const { test, saveQuestion, questions, isSaveQuestion, setIsSaveQuestion } = useCreateTest();

  console.log("isSaveQuestion:", isSaveQuestion)
  return (
    <div className="flex flex-col items-center w-[600px] mx-auto pt-4">
      {/** TEST INFO */}
      <TestInfo
        options={options}
      />

      {/** QUESTION */}
      <div className="flex flex-col gap-4 w-full">
        {questions.map((item, index) => {
          return <QuestionItem
            data={item}
            key={index}
            id={index}
            className="first:mt-4"
          />
        })}
      </div>

      {/** ADD QUESTION */}
      {!isSaveQuestion && <FormQuestionItem
        onSaveQuestion={(data) => saveQuestion(data)}
        isReset={isSaveQuestion}
        questionIndex={questions.length + 1}
      />}

      <div className="mt-8 mb-[59px]">
        <button
          type="button"
          className="flex items-center py-2 px-4 border border-solid border-secondary-base text-secondary-base text-15 leading-24"
          onClick={() => setIsSaveQuestion(false)}
        >
          <RenderIcon name="plus" className="mr-2" />
          Add question
        </button>
      </div>
    </div>
  )
}
