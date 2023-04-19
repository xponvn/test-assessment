"use client"
import { useState } from 'react';
import FormQuestionItem from './components/block/form-question-item';
import QuestionItem from './components/block/question-item';
import TestInfo from './components/block/test-info';
import { RenderIcon } from './icons';
import './styles/style.css';
import { useQuestion } from './utils';
import clsx from 'clsx';

export default function CreateTest() {
  const options = [{ label: "Intern", value: "Intern" }, { label: "Fresher", value: "Fresher" }, { label: "Junior", value: "Junior" }, { label: "Mid", value: "Mid" }, { label: "Senior", value: "Senior" }]
  const {
    questions,
    addQuestion,
    deleteQuestion
  } = useQuestion();
  const [indexQuestionEdit, setIndexQuestionEdit] = useState<number>();
  
  return (
    <div className="flex flex-col items-center w-[600px] mx-auto pt-4">
      {/** TEST INFO */}
      <TestInfo
        options={options}
      />

      {/** QUESTION */}
      <div className="flex flex-col gap-4 w-full">
        {questions.map((item, index) => {
          return <div key={index}>
            {index === indexQuestionEdit ? <FormQuestionItem
              onSaveForm={(data) => {
                addQuestion(data, true, index);
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
