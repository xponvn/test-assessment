import { Icon } from '@test-assessment/ui-components';
import clsx from 'clsx';
import { useState } from 'react';
import FormQuestionItem from '../add/components/block/form-question-item';
import QuestionItem from '../add/components/block/question-item';
import TestInfo from '../add/components/block/test-info';
import { TestInfoType, useQuestion } from '../add/utils';

interface Props {
  onSave: (data: TestInfoType) => void;
}

const TestForm = ({ onSave }: Props) => {
  const { test, questions, addQuestion, deleteQuestion } = useQuestion();
  const [indexQuestionEdit, setIndexQuestionEdit] = useState<number>(-1);

  return (
    <div className="container grid grid-cols-12 gap-6 items-start mx-auto -translate-y-[128px] bg-neutral-white p-6">
      <div className="col-span-4">
        <TestInfo
          name={test.name}
          position={test.position}
          levelPosition={test.levelPosition}
          timeLimit={test.timeLimit}
          passingScore={test.passingScore}
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
                  onDelete={deleteQuestion}
                  onEdit={setIndexQuestionEdit}
                />
              )}
            </div>
          );
        })}

        {(questions.length <= 0 || indexQuestionEdit === questions.length) && (
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
  );
};

export default TestForm;
