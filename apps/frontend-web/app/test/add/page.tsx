'use client';
import {
  Enum_Test_Level,
  TestInput,
  useApiClient,
} from '@test-assessment/cms-graphql-api';
import { Icon } from '@test-assessment/ui-components';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FormQuestionItem from './components/block/form-question-item';
import QuestionItem from './components/block/question-item';
import TestInfo from './components/block/test-info';
import './styles/style.css';
import {
  TestInfoType,
  transformQuestion,
  useQuestion
} from './utils';

export default function CreateTest() {
  const { setTest, questions, addQuestion, deleteQuestion, setQuestions } =
    useQuestion();
  const [indexQuestionEdit, setIndexQuestionEdit] = useState<number>();
  const { apiClient } = useApiClient();
  const router = useRouter();

  const onSaveAsDraft = async (data: TestInfoType) => {
    if (!questions || questions.length <= 0)
      return alert('Question must be greater than or equal to 1.');
    setTest({ ...data, questions: questions });
    const dataTransform = transformDataSubmit(data);
    const res = await apiClient.createTest({ data: dataTransform });
    if (res.createTest) {
      router.push('/test');
      setQuestions([]);
    }
  };

  const transformDataSubmit = (data: TestInfoType): TestInput => {
    const questionsTransform = transformQuestion(questions);
    return {
      name: data.name,
      passingScore: Number(data.passingScore),
      timeLimit: Number(data.timeLimit),
      questions: questionsTransform,
      position: data.position,
      level: data.levelPosition as Enum_Test_Level,
    };
  };

  return (
    <div
      className="h-full bg-neutral-table-header"
      style={{ background: '#F3F0F5' }}
    >
      <div className="container grid grid-cols-12 gap-6 items-start mx-auto -translate-y-[128px] bg-neutral-white p-6">
        {/** TEST INFO */}
        <div className="col-span-4">
          <TestInfo onSaveAsDraft={onSaveAsDraft} />
        </div>

        {/** QUESTION */}
        <div className="col-span-8">
          <div className="flex flex-col w-full gap-4">
            {questions.map((item, index) => {
              return (
                <div key={index}>
                  {index === indexQuestionEdit ? (
                    <FormQuestionItem
                      onSaveForm={(data) => {
                        addQuestion(data, index);
                        setIndexQuestionEdit(-1);
                      }}
                      questionIndex={indexQuestionEdit}
                      onDeleteForm={() => setIndexQuestionEdit(-1)}
                      data={item}
                    />
                  ) : (
                    <QuestionItem
                      data={item}
                      key={index}
                      index={index}
                      className="first:mt-4"
                      onDelete={deleteQuestion}
                      onEdit={setIndexQuestionEdit}
                    />
                  )}
                </div>
              );
            })}

            {(questions.length <= 0 ||
              indexQuestionEdit === questions.length) && (
              <FormQuestionItem
                onSaveForm={(data) => {
                  addQuestion(data);
                  setIndexQuestionEdit(-1);
                }}
                questionIndex={indexQuestionEdit}
                onDeleteForm={() => setIndexQuestionEdit(-1)}
              />
            )}
          </div>

          <div className="mt-8 mb-[59px]">
            <button
              type="button"
              className={clsx(
                'flex items-center py-2 px-4 border border-solid text-15 leading-24 border-secondary-base text-secondary-base',
                {
                  'opacity-100': indexQuestionEdit === -1,
                  'opacity-30 cursor-not-allowed': indexQuestionEdit !== -1,
                }
              )}
              onClick={() => setIndexQuestionEdit(questions.length)}
            >
              <Icon name="plus" className="mr-2" />
              Add question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
