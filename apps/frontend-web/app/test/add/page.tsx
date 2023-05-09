'use client';
import {
  Enum_Test_Level,
  TestInput,
  useApiClient,
} from '@test-assessment/cms-graphql-api';
import { Button, Icon } from '@test-assessment/ui-components';
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
import Link from 'next/link';

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
      className="h-auto bg-neutral-table-header min-h-full"
      style={{ background: '#F3F0F5' }}
    >

      <div className="container items-start mx-auto -translate-y-[128px] bg-neutral-white p-6">
        {/** Header */}
        <div className="flex items-center justify-between mb-6">
          {/** Breadcrumb */}
          <div className="flex items-center gap-1 text-12 leading-4">
            <Link href="/test" className="text-neutral-text-secondary">
              Test management
            </Link>
            <Icon name="arrow-right" className="text-neutral-border !w-4 !h-4" />
            <p className="text-neutral-border">Create test</p>
          </div>

          <Link href="/">
            <div className="flex items-center text-13 leading-6 font-medium text-primary-base">
              How to create a test
              <Icon name="qa" className="!w-5 !h-5 ml-2" /></div>
          </Link>
        </div>

        <div className='flex gap-6'>
          {/** TEST INFO */}
          <div className="w-[368px]">
            <p className="font-bold text-18 leading-6 text-neutral-text-primary mb-4 capitalize">Test Settings</p>
            <TestInfo onSaveAsDraft={onSaveAsDraft} />
          </div>

          {/** QUESTION */}
          <div className="flex-1 w-full">
            <div className="flex flex-col w-full gap-6">
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
                        onDelete={(index) => {
                          deleteQuestion(index);
                          if (index === 0) {
                            setIndexQuestionEdit(undefined)
                          }
                        }}
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
              <Button 
                disabled={indexQuestionEdit !== -1}
                type="button"
                size="large"
                RightIcon={<Icon name="plus-circle" className="ml-2" />}
                onClick={() => setIndexQuestionEdit(questions.length) }
                className={clsx(
                  "border-dashed border-secondary-base border-[1px] bg-secondary-background text-neutral-text-primary w-full max-h-12",
                  {
                    'opacity-100': indexQuestionEdit === -1,
                    'opacity-30 cursor-not-allowed': indexQuestionEdit !== -1,
                  }
                )}
              >
                Add question
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
