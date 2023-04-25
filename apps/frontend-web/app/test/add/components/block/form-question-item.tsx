import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from "yup";
import Checkbox from '../form-base/checkbox';
import Input from '../form-base/input';
import RadioButton from '../form-base/radio-button';
import RadioButtonGroup from '../form-base/radio-button-group';
import { QuestionLevel, QuestionItemType, QuestionType, getPoint } from '../../utils';
import { RenderIcon } from '@test-assessment/ui-components';

// INPUT OPTION
const optionsDifficulty = [{ label: "Easy", value: QuestionLevel.Easy }, { label: "Medium", value: QuestionLevel.Medium }, { label: "Hard", value: QuestionLevel.Hard },];
const optionsTypeAnswer = [{ label: "Single choice", value: "SingleChoice" }, { label: "Multiple choice", value: "MultipleChoice" }, { label: "Free text", value: "FreeText" },];

export type QuestionItemProps = {
  onSaveForm: (data: QuestionItemType) => void;
  onDeleteForm: () => void;
  questionIndex: number;
  data?: QuestionItemType
};

export default function FormQuestionItem({ onSaveForm, onDeleteForm, questionIndex, data }: QuestionItemProps) {
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.SingleChoice);
  const [questionDif, setQuestionDif] = useState<QuestionLevel>(QuestionLevel.Easy);

  // Form schema
  const answersSchema = {
    content: yup.string().required("Required field."),
  };

  const schema = yup.object({
    content: yup.string().required(),
    level: yup.string().required(),
    type: yup.string().required(),
    correctAnswer: questionType === "SingleChoice" ? yup.string().required("Required field.") : yup.array().typeError("Required field.").of(yup.string()).required("Required field.").min(1),
    answers: yup
      .array()
      .of(yup.object().shape(answersSchema))
      .required("Must have fields")
      .min(1, "Minimum of 1 field")
  }).required();

  const schemaFreeText = yup.object({
    content: yup.string().required(),
    level: yup.string().required(),
    type: yup.string().required()
  }).required();

  // React hook form
  const { handleSubmit, control, register, setValue, formState: { errors }, reset } = useForm<QuestionItemType>({
    defaultValues: {
      content: '',
      level: QuestionLevel.Easy,
      type: QuestionType.SingleChoice,
      answers: [{ content: '' }, { content: '' }],
      correctAnswer: questionType === "SingleChoice" ? "" : [],
      ...data
    },
    resolver: yupResolver(questionType === QuestionType.FreeText ? schemaFreeText : schema),
    mode: "onChange"
  });

  // Answer array field
  const { fields, remove, append } = useFieldArray({
    control,
    name: "answers",
  });

  const onChangeTypeOfAnswer = (value: string) => {
    setQuestionType(value as QuestionType);
    setValue("correctAnswer", value === "SingleChoice" ? "" : []);
  };

  const onChangeQuestionLevel = (value: string) => {
    setQuestionDif(value as QuestionLevel)
  }

  useEffect(() => {
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  useEffect(() => {
    if(data) {
      setQuestionType(data.type);
      setQuestionDif(data.level)
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center w-full mx-auto">
      <form onSubmit={handleSubmit(onSaveForm)} className="w-full">
        <div
          style={{ filter: "drop-shadow(5px 5px 0px #983795)" }}
          className="bg-neutral-table-header border border-solid border-neutral-divider">
          <div className="px-6 py-4">
            <p className="text-13 leading-20 font-bold">Question {questionIndex ? (questionIndex + 1) : 1}<span className="text-neutral-placeholder text-13 leading-20 font-normal ml-1">({getPoint(questionDif)} point)</span></p>
            <Input
              className="mt-2"
              {...register("content")}
              error={errors?.content?.message}
            />

            <RadioButtonGroup
              label="Difficulty"
              options={optionsDifficulty}
              className="mt-4"
              {...register("level")}
              error={errors.level?.message}
              onClick={(value) => onChangeQuestionLevel(value)}
            />
          </div>

          <div className="px-6 py-4 bg-white border-t border-solid border-neutral-divider">
            <RadioButtonGroup
              label="Type of answer"
              options={optionsTypeAnswer}
              {...register("type")}
              error={errors.type?.message}
              onClick={(value) => onChangeTypeOfAnswer(value)}
            />

            {questionType !== "FreeText" && <>
              <div className="mt-6 grid grid-cols-1 gap-2">
                {fields.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <p className="text-neutral-text-primary text-13 leading-20 mb-2">Answer {index + 1}</p>
                      <div className="flex">
                        <div className="w-[427px] mr-4">
                          <Input
                            {...register(`answers.${index}.content`)}
                            error={errors?.['answers']?.[index]?.['content']?.['message']}
                          />
                        </div>
                        <div className="flex items-center">
                          {questionType === "SingleChoice" ? <RadioButton
                            item={{ label: 'Correct', value: `answer-${index}` }}
                            {...register("correctAnswer")}
                            error={errors.correctAnswer?.message}
                          /> :
                            <Checkbox
                              item={{ label: 'Correct', value: `answer-${index}` }}
                              {...register("correctAnswer")}
                              error={errors.correctAnswer?.message}
                            />}
                          {fields.length > 2 && <button className="ml-2" type="button" onClick={() => remove(index)}>
                            <RenderIcon name="delete" className="!w-4 !h-4 text-error-base" />
                          </button>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button
                type="button"
                className="flex items-center text-14 leading-[22px] text-primary-clicked cursor-pointer mt-6"
                onClick={() => append({ content: '' })}
              >
                <RenderIcon name="plus" /> Add Answer
              </button>
            </>}
          </div>

          <div className='px-6 py-4 border-t border-solid border-neutral-divider flex items-center justify-end gap-4'>
            <button onClick={() => onDeleteForm()} type="button" className="outline-none text-13 leading-24 text-error-base font-medium py-2 px-4">Delete</button>
            <button type="submit" className="outline-none bg-primary-base border border-solid border-primary-base text-neutral-text-primary text-13 leading-24 font-medium py-2 px-4">Save</button>
          </div>
        </div>
      </form>
    </div>
  )
}
