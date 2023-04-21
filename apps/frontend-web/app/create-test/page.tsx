"use client"
import { useEffect, useState } from 'react';
import FormQuestionItem from './components/block/form-question-item';
import QuestionItem from './components/block/question-item';
import TestInfo from './components/block/test-info';
import { RenderIcon } from './icons';
import './styles/style.css';
import { TestInfoType, getLevelPosition, transformPositions, transformQuestion, useQuestion } from './utils';
import clsx from 'clsx';
import { Enum_Test_Level, TestInput, useApiClient } from '@test-assessment/cms-graphql-api';
import { SelectOption } from './components/form-base/select';

export default function CreateTest() {
  // const otpPositions = [{ label: "Intern", value: "Intern" }, { label: "Fresher", value: "Fresher" }, { label: "Junior", value: "Junior" }, { label: "Mid", value: "Mid" }, { label: "Senior", value: "Senior" }]
  const {
    setTest,
    questions,
    addQuestion,
    deleteQuestion
  } = useQuestion();
  const [otpPositions, setOtpPositions] = useState<SelectOption[]>([]);
  const [indexQuestionEdit, setIndexQuestionEdit] = useState<number>();
  const { apiClient } = useApiClient();

  useEffect(() => {
    getPositions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPositions = async () => {
    const res = await apiClient.getPositions({ sort: ["name"] });
    const dataTransform = transformPositions(res?.positions?.data || []);
    setOtpPositions(dataTransform);
  }

  const onSaveAsDraft = async (data: TestInfoType) => {
    if (!questions || questions.length <= 0) return alert('Question must be greater than or equal to 1.')
    setTest({ ...data, questions: questions });
    const dataTransform = transformDataSubmit(data);
    const res = await apiClient.createTest({ data: dataTransform });
    if (res.createTest) return alert("Create a test success.")
  }

  const transformDataSubmit = (data: TestInfoType): TestInput => {
    const questionsTransform = transformQuestion(questions);
    return {
      name: data.name,
      passingScore: Number(data.passingScore),
      timeLimit: Number(data.timeLimit),
      questions: questionsTransform,
      position: data.position,
      level: data.levelPosition as Enum_Test_Level
    }
  }

  return (
    <div className="flex flex-col items-center w-[600px] mx-auto pt-4">
      {/** TEST INFO */}
      <TestInfo
        otpPositions={otpPositions}
        otpLevel={getLevelPosition()}
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
