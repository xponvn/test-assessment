import { yupResolver } from '@hookform/resolvers/yup';
import { Icon, Input } from '@test-assessment/ui-components';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  QuestionItemType,
  QuestionLevel,
  QuestionType,
} from '../../utils';
import Checkbox from '../form-base/checkbox';
import RadioButton from '../form-base/radio-button';
import RadioButtonGroup from '../form-base/radio-button-group';
import TextArea from '../form-base/text-area';

// INPUT OPTION
const optionsDifficulty = [
  { label: 'Easy', value: QuestionLevel.Easy },
  { label: 'Medium', value: QuestionLevel.Medium },
  { label: 'Hard', value: QuestionLevel.Hard },
];
const optionsTypeAnswer = [
  { label: 'Single choice', value: 'SingleChoice' },
  { label: 'Multiple choice', value: 'MultipleChoice' },
  { label: 'Free text', value: 'FreeText' },
];

export type QuestionItemProps = {
  onSaveForm: (data: QuestionItemType) => void;
  onDeleteForm: () => void;
  questionIndex: number;
  data?: QuestionItemType;
};

// Form schema
const answersSchema = {
  content: yup.string().required('Required field.'),
  isCorrect: yup.boolean().required(),
};

export const schema = yup
  .object({
    content: yup.string().required(),
    level: yup.string().required(),
    type: yup.string().required(),
    answers: yup.array().when('type', {
      is: (val) => val === QuestionType.FreeText,
      then: (schema) => schema,
      otherwise: (schema) =>
        schema
          .of(yup.object().shape(answersSchema))
          .min(1, 'Minimum of 1 field')
          .test(
            'has correct answer',
            'You have to mark at least 1 question as correct answer',
            (value) => value?.some((answer) => !!answer.isCorrect)
          ),
    }),
  })
  .required();

export default function FormQuestionItem({
  onSaveForm,
  onDeleteForm,
  questionIndex,
  data,
}: QuestionItemProps) {
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.SingleChoice
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [questionDif, setQuestionDif] = useState<QuestionLevel>(
    QuestionLevel.Easy
  );

  // React hook form
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
    reset,
    getValues,
  } = useForm<QuestionItemType>({
    defaultValues: {
      content: '',
      level: QuestionLevel.Easy,
      type: QuestionType.SingleChoice,
      answers: [
        { content: '', isCorrect: false },
        { content: '', isCorrect: false },
      ],
      ...data,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  // Answer array field
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'answers',
  });

  const onChangeTypeOfAnswer = (value: string) => {
    setQuestionType(value as QuestionType);
  };

  const onChangeQuestionLevel = (value: string) => {
    setQuestionDif(value as QuestionLevel);
  };

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  useEffect(() => {
    if (data) {
      setQuestionType(data.type);
      setQuestionDif(data.level);
    }
  }, [data]);

  const onSelectSingleChoice = (index: number) => {
    const newAnswers = getValues('answers').map((answer, idx) => {
      if (index === idx) {
        return { ...answer, isCorrect: true };
      }
      return { ...answer, isCorrect: false };
    });
    setValue('answers', newAnswers);
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto">
      <form onSubmit={handleSubmit(onSaveForm)} className="w-full">
        <div
          style={{ filter: 'drop-shadow(5px 5px 0px #983795)' }}
          className="border border-solid bg-neutral-table-header border-neutral-border px-6 py-4"
        >

          {/** Question info session */}
          <div>
            <p className="font-medium text-neutral-placeholder text-13 leading-6">
              Question {questionIndex ? questionIndex + 1 : 1}
              <span className="pl-[2px] text-error-base">*</span>
              {/* <span className="ml-1 font-normal text-neutral-placeholder text-13 leading-20">
                ({getPoint(questionDif)} point)
              </span> */}
            </p>
            <TextArea
              className="mt-2 !w-full"
              {...register('content')}
              placeholder="Enter question"
              error={errors?.content?.message}
            />
          </div>

          {/** Option session */}
          <div className="flex gap-10 items-center mt-6">
            <RadioButtonGroup
              label="Difficulty"
              options={optionsDifficulty}
              {...register('level')}
              error={errors.level?.message}
              onClick={(value) => onChangeQuestionLevel(value)}
            />
            <span className="bg-neutral-disable rotate-90 min-w-[56px] h-[1px]"></span>
            <RadioButtonGroup
              label="Type of answer"
              options={optionsTypeAnswer}
              {...register('type')}
              error={errors.type?.message}
              onClick={(value) => onChangeTypeOfAnswer(value)}
            />
          </div>

          {/** Answer session */}
          {questionType !== 'FreeText' && (<div className="bg-neutral-bg border-t border-solid border-neutral-divider p-4 mt-6">
            <div className="grid grid-cols-1 gap-2">
              {fields.map((item, index) => {
                return (
                  <div key={item.id}>
                    <p className="font-medium text-neutral-placeholder text-13 leading-6 mb-2">
                      Answer {index + 1}
                      <span className="pl-[2px] text-error-base">*</span>
                    </p>
                    <div className="flex gap-6">
                      <div className="w-full">
                        <Input
                          {...register(`answers.${index}.content`)}
                          error={
                            errors?.['answers']?.[index]?.['content']?.[
                            'message'
                            ]
                          }
                          className="h-10 !w-full"
                        />
                      </div>
                      <div className="flex items-center gap-6">
                        {questionType === 'SingleChoice' ? (
                          <Controller
                            control={control}
                            name={`answers.${index}.isCorrect`}
                            render={({ field }) => (
                              <RadioButton
                                {...field}
                                item={{
                                  label: 'Correct',
                                  value: `answer-${index}`,
                                }}
                                value={`answer-${index}`} // for bypass typechecking only
                                checked={item.isCorrect}
                                onChange={(e) =>
                                  onSelectSingleChoice(index)
                                }
                                styleVariant="style_2"
                              />
                            )}
                          />
                        ) : (
                          <Controller
                            control={control}
                            name={`answers.${index}.isCorrect`}
                            render={({ field }) => (
                              <Checkbox
                                {...field}
                                item={{
                                  label: 'Correct',
                                  value: `answer-${index}`,
                                }}
                                value={`answers.${index}`}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                              />
                            )}
                          />
                        )}

                        {fields.length > 2 && (
                          <>
                            <span className="rotate-90 bg-neutral-disable min-w-[24px] h-[1px]"></span>
                            <button
                              type="button"
                              onClick={() => remove(index)}
                            >
                              <Icon
                                name="remove-outline"
                                className="!w-6 !h-6"
                              />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {errors?.answers && (
                <p className="mt-1 text-error-base">
                  {errors.answers.message}
                </p>
              )}
            </div>
            <button
              type="button"
              className="flex items-center text-13 leading-6 font-medium text-primary-base cursor-pointer mt-4"
              onClick={() => append({ content: '', isCorrect: false })}
            >
              <Icon name="plus-circle" className="mr-2" /> Add Answer
            </button>
          </div>)}

          {/** Action session */}
          <div className="flex items-center justify-end gap-6 mt-6">
            <button
              onClick={() => onDeleteForm()}
              type="button"
              className="font-medium outline-none text-13 leading-24 text-error-base"
            >
              Delete
            </button>
            <button
              type="submit"
              className="px-2 py-1 font-bold border border-solid outline-none bg-primary-base border-primary-base text-neutral-text-primary text-13 leading-6 uppercase"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
