"use client"
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from "yup";
import { RenderIcon } from '../icons';
import Checkbox from './checkbox';
import Input from './input';
import RadioButton from './radio-button';
import RadioButtonGroup from './radio-button-group';

export default function QuestionItem() {
  const [answerType, setAnswerType] = useState<string>('SingleChoice')
  const answersSchema = {
    content: yup.string().required("Required field."),
  };

  const schema = yup.object({
    name: yup.string().required(),
    difficulty: yup.string().required(),
    type: yup.string().required(),
    correctAnswer: answerType === "SingleChoice" ? yup.string().required("Required field.") : yup.array().typeError("Required field.").of(yup.string()).required("Required field.").min(1),
    answers: yup
      .array()
      .of(yup.object().shape(answersSchema))
      .required("Must have fields")
      .min(1, "Minimum of 1 field")
  }).required();

  const { handleSubmit, control, watch, register, setValue, getValues, formState: { errors }, } = useForm({
    defaultValues: {
      name: '',
      difficulty: 'Easy',
      type: 'SingleChoice',
      answers: [{ content: '' }],
      correctAnswer: answerType === "SingleChoice" ? "" : []
    },
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const { fields, remove, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "answers", // unique name for your Field Array
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("data:", data)
  };

  const optionsDifficulty = [{ label: "Easy", value: "Easy" }, { label: "Medium", value: "Medium" }, { label: "Hard", value: "Hard" },];
  const optionsTypeAnswer = [{ label: "Single choice", value: "SingleChoice" }, { label: "Multiple choice", value: "MultipleChoice" }, { label: "Free text", value: "FreeText" },];
  const onChangeTypeOfAnswer = (value: string) => {
    setAnswerType(value);
    setValue("correctAnswer", value === "SingleChoice" ? "" : [])
  };

  return (
    <div className="flex flex-col items-center w-[600px] mx-auto pt-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div
          style={{ filter: "drop-shadow(5px 5px 0px #983795)" }}
          className="bg-neutral-table-header border border-solid border-neutral-divider mt-4">
          <div className="px-6 py-4">
            <p className="text-13 leading-20 font-bold">Question 1<span className="text-neutral-placeholder text-13 leading-20 font-normal">({1} point)</span></p>
            <Input
              className="mt-2"
              {...register("name")}
              error={errors?.name?.message}
            />

            <RadioButtonGroup
              label="Difficulty"
              options={optionsDifficulty}
              className="mt-4"
              {...register("difficulty")}
              error={errors.difficulty?.message}
            />
          </div>

          <div className="px-6 py-4 bg-white border-t border-solid border-neutral-divider">
            <RadioButtonGroup
              label="Type of answer"
              options={optionsTypeAnswer}
              onClick={(value) => onChangeTypeOfAnswer(value)}
              {...register("type")}
              error={errors.type?.message}
            />

            {answerType !== "FreeText" && <>
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
                          {answerType === "SingleChoice" ? <RadioButton
                            item={{ label: 'Correct', value: `answer-${index}` }}
                            {...register("correctAnswer")}
                            error={errors.correctAnswer?.message}
                          /> :
                            <Checkbox
                              item={{ label: 'Correct', value: `answer-${index}` }}
                              {...register("correctAnswer")}
                              error={errors.correctAnswer?.message}
                            />}
                          <button className="ml-2" type="button" onClick={() => remove(index)}>
                            <RenderIcon name="delete" className="!w-4 !h-4 text-error-base" />
                          </button>
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
            <button type="button" className="outline-none text-13 leading-24 text-error-base font-medium py-2 px-4">Delete</button>
            <button type="submit" className="outline-none bg-primary-base border border-solid border-primary-base text-neutral-text-primary text-13 leading-24 font-medium py-2 px-4">Save</button>
          </div>
        </div>
      </form>
    </div>
  )
}
