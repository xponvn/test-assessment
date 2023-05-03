import { Button, Icon } from '@test-assessment/ui-components';
import { useState } from 'react';
import FormQuestionItem from '../add/components/block/form-question-item';
import QuestionItem from '../add/components/block/question-item';
import TestInfo from '../add/components/block/test-info';
import { TestInfoType, useQuestion } from '../add/utils';

interface Props {
  isLoading?: boolean;
  onSave: (data: TestInfoType) => void;
}

const TestForm = ({ isLoading, onSave }: Props) => {
  const { test, questions, addQuestion, deleteQuestion } = useQuestion();
  const [indexQuestionEdit, setIndexQuestionEdit] = useState<number>(-1);

  return (
    <div className="container grid grid-cols-12 gap-6 items-start mx-auto -translate-y-[128px] bg-neutral-white p-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="col-span-4">
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

          <div className="flex flex-col w-full gap-4 col-span-8">
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
                      disableEdit={!!test?.publishedAt}
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

            <div className="mt-8 mb-[59px]">
              <Button
                type="button"
                className={`flex items-center py-2 px-4 border border-solid text-15 leading-24 border-secondary-base text-secondary-base bg-transparent font-normal ${
                  indexQuestionEdit === -1 && !test?.publishedAt
                    ? ''
                    : 'opacity-30'
                }`}
                LeftIcon={<Icon name="plus" />}
                disabled={indexQuestionEdit !== -1 || !!test?.publishedAt}
                onClick={() => setIndexQuestionEdit(questions.length)}
              >
                Add question
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestForm;
