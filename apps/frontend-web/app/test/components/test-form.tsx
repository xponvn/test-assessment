import { Button, Icon } from '@test-assessment/ui-components';
import { useState } from 'react';
import FormQuestionItem from '../add/components/block/form-question-item';
import QuestionItem from '../add/components/block/question-item';
import TestInfo from '../add/components/block/test-info';
import { TestInfoType, useQuestion } from '../add/utils';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  isLoading?: boolean;
  onSave: (data: TestInfoType) => void;
}

const TestForm = ({ isLoading, onSave }: Props) => {
  const { test, questions, addQuestion, deleteQuestion } = useQuestion();
  const [indexQuestionEdit, setIndexQuestionEdit] = useState<number>(-1);

  return (
    <div className="h-auto bg-neutral-table-header min-h-full">
      <div className="container items-start mx-auto -translate-y-[128px] bg-neutral-white p-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/** Header */}
            <div className="flex items-center justify-between mb-6">
              {/** Breadcrumb */}
              <div className="flex items-center gap-1 text-12 leading-4">
                <Link href="/test" className="text-neutral-text-secondary">
                  Test management
                </Link>
                <Icon name="arrow-right" className="text-neutral-border !w-4 !h-4" />
                <p className="text-neutral-border">Edit test</p>
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
                <TestInfo
                  name={test.name}
                  position={test.position}
                  levelPosition={test.levelPosition}
                  timeLimit={test.timeLimit}
                  passingScore={test.passingScore}
                  disableEdit={!!test?.publishedAt}
                  onSaveAsDraft={onSave}
                />
              </div>

              <div className="flex-1 w-full">
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
                            disableEdit={!!test?.publishedAt}
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

                <div className="mt-4 mb-[59px]">
                  <Button
                    disabled={indexQuestionEdit !== -1 || !!test?.publishedAt}
                    type="button"
                    size="large"
                    RightIcon={<Icon name="plus-circle" className="ml-2" />}
                    onClick={() => setIndexQuestionEdit(questions.length)}
                    className={clsx(
                      "border-dashed border-secondary-base border-[1px] bg-secondary-background text-neutral-text-primary w-full max-h-12",
                      {
                        'opacity-100': indexQuestionEdit === -1 && !test?.publishedAt,
                        'opacity-30 cursor-not-allowed': indexQuestionEdit !== -1 || !!test?.publishedAt,
                      }
                    )}
                  >
                    Add question
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestForm;
