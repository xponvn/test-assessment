"use client"
import { useState } from 'react';
import FormQuestionItem from './components/block/form-question-item';
import QuestionItem from './components/block/question-item';
import TestInfo from './components/block/test-info';
import { RenderIcon } from './icons';
import './styles/style.css';
import { TestInfoType, transformQuestion, useQuestion } from './utils';
import clsx from 'clsx';
import { TestInput } from '@test-assessment/cms-graphql-api';

export default function CreateTest() {
  const otpPositions = [{ label: "Intern", value: "Intern" }, { label: "Fresher", value: "Fresher" }, { label: "Junior", value: "Junior" }, { label: "Mid", value: "Mid" }, { label: "Senior", value: "Senior" }]
  const {
    setTest,
    questions,
    addQuestion,
    deleteQuestion
  } = useQuestion();
  const [indexQuestionEdit, setIndexQuestionEdit] = useState<number>();
  
  const onSaveAsDraft = (data: TestInfoType) => {
    if(!questions || questions.length <= 0) return alert('Question must be greater than or equal to 1.')
    setTest({...data, questions: questions });
    const newData = transformData(data);
  }
  
  const transformData = (data: TestInfoType): TestInput => {
    const questionsTransform = transformQuestion(questions);
    return {
      passingScore: Number(data.passingScore),
      position: data.position,
      timeLimit: Number(data.timeLimit),
      title: data.name,
      questions: questionsTransform
    }
  }
  
  return (
    <div className="flex flex-col items-center w-[600px] mx-auto pt-4">
      {/** TEST INFO */}
      <TestInfo
        otpPositions={otpPositions}
        onSaveAsDraft={onSaveAsDraft}
      />

      {/** QUESTION */}
      <div className="flex flex-col gap-4 w-full">
        {questions.map((item, index) => {
          return <div key={index}>
            {index === indexQuestionEdit ? <FormQuestionItem
              onSaveForm={(data) => {
                addQuestion(data, index);
                setIndexQuestionEdit(-1)
              }}
              questionIndex={indexQuestionEdit}
              onDeleteForm={() => setIndexQuestionEdit(-1)}
              data={item}
            /> :
              <QuestionItem
                data={item}
                key={index}
                index={index}
                className="first:mt-4"
                onDelete={deleteQuestion}
                onEdit={setIndexQuestionEdit}
              />}
          </div>
        })}

        {(questions.length <= 0 || indexQuestionEdit === questions.length) && <FormQuestionItem
          onSaveForm={(data) => {
            addQuestion(data);
            setIndexQuestionEdit(-1)
          }}
          questionIndex={indexQuestionEdit}
          onDeleteForm={() => setIndexQuestionEdit(-1)}
        />}
      </div>

      <div className="mt-8 mb-[59px]">
        <button
          type="button"
          className={clsx("flex items-center py-2 px-4 border border-solid text-15 leading-24 border-secondary-base text-secondary-base", {
            "opacity-100": indexQuestionEdit === -1,
            "opacity-30 cursor-not-allowed": indexQuestionEdit !== -1
          })}
          onClick={() => setIndexQuestionEdit(questions.length)}
        >
          <RenderIcon name="plus" className="mr-2" />
          Add question
        </button>
      </div>
    </div>
  )
}
