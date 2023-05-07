import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@test-assessment/ui-components';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  QuestionItemType,
  QuestionLevel,
  QuestionType,
  getPoint,
} from '../../utils';
import Checkbox from '../form-base/checkbox';
import Input from '../form-base/input';
import RadioButton from '../form-base/radio-button';
import RadioButtonGroup from '../form-base/radio-button-group';

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
  const { fields, remove, update, append } = useFieldArray({
    control,
    name: 'answers',
  });

  const onChangeTypeOfAnswer = (value: string) => {
    if (value === QuestionType.SingleChoice) {
      // NOTE: unchecked all answer
      const newAnswers = getValues('answers').map((answer) => {
        return { ...answer, isCorrect: false };
      });
      setValue('answers', newAnswers);
    }
    setQuestionType(value as QuestionType);
  };

  const onChangeQuestionLevel = (value: string) => {
    setQuestionDif(value as QuestionLevel);
  };

  useEffect(() => {
    reset();
  }, [questionIndex, reset]);

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
          className="border border-solid bg-neutral-table-header border-neutral-divider"
        >
          <div className="px-6 py-4">
            <p className="font-bold text-13 leading-20">
              Question {questionIndex ? questionIndex + 1 : 1}
              <span className="ml-1 font-normal text-neutral-placeholder text-13 leading-20">
                ({getPoint(questionDif)} point)
              </span>
            </p>
            <Input
              className="mt-2"
              {...register('content')}
              error={errors?.content?.message}
            />
            <RadioButtonGroup
              label="Difficulty"
              options={optionsDifficulty}
              className="mt-4"
              {...register('level')}
              error={errors.level?.message}
              onClick={(value) => onChangeQuestionLevel(value)}
            />
          </div>

          <div className="px-6 py-4 bg-white border-t border-solid border-neutral-divider">
            <RadioButtonGroup
              label="Type of answer"
              options={optionsTypeAnswer}
              {...register('type')}
              error={errors.type?.message}
              onClick={(value) => onChangeTypeOfAnswer(value)}
            />

            {questionType !== 'FreeText' && (
              <>
                <div className="grid grid-cols-1 gap-2 mt-6">
                  {fields.map((item, index) => {
                    return (
                      <div key={item.id}>
                        <p className="mb-2 text-neutral-text-primary text-13 leading-20">
                          Answer {index + 1}
                        </p>
                        <div className="flex">
                          <div className="w-[427px] mr-4">
                            <Input
                              {...register(`answers.${index}.content`)}
                              error={
                                errors?.['answers']?.[index]?.['content']?.[
                                  'message'
                                ]
                              }
                            />
                          </div>
                          <div className="flex items-center">
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
                                    checked={item.isCorrect}
                                    onChange={() => {
                                      update(index, {
                                        ...item,
                                        isCorrect: !item.isCorrect,
                                      });
                                    }}
                                  />
                                )}
                              />
                            )}
                            {fields.length > 2 && (
                              <button
                                className="ml-2"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <Icon
                                  name="remove"
                                  className="!w-4 !h-4 text-error-base"
                                />
                              </button>
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
                  className="flex items-center text-14 leading-[22px] text-primary-clicked cursor-pointer mt-6"
                  onClick={() => append({ content: '', isCorrect: false })}
                >
                  <Icon name="plus" /> Add Answer
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-solid border-neutral-divider">
            <button
              onClick={() => onDeleteForm()}
              type="button"
              className="px-4 py-2 font-medium outline-none text-13 leading-24 text-error-base"
            >
              Delete
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-medium border border-solid outline-none bg-primary-base border-primary-base text-neutral-text-primary text-13 leading-24"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
