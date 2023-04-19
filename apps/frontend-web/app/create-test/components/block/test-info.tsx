import Input from '../form-base/input';
import Select, { SelectOption } from '../form-base/select';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { TestInfoType, useQuestion } from '../../utils';

export type TestInfoProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: SelectOption[]
}
export default function TestInfo({
  options
}: TestInfoProps) {
  const { setTest, questions } = useQuestion();
  const schema = yup.object({
    name: yup.string().required("Required field."),
    position: yup.string().required("Required field."),
    levelPosition: yup.string().required("Required field."),
    timeLimit: yup.number().typeError("Field must be number.").required("Required field."),
    passingScore: yup.string().required("Required field."),
  }).required();

  const { register, handleSubmit, formState: { errors } } = useForm<TestInfoType>({
    defaultValues: {
      name: '',
      position: '',
      levelPosition: '',
      timeLimit: '',
      passingScore: '',
    },
    resolver: yupResolver(schema)
  });

  const onSaveForm = (data: TestInfoType) => {
    if(!questions || questions.length <= 0) return alert('Question must be greater than or equal to 1.')
    setTest({...data, questions: questions })
  }

  return (
    <form className="border border-solid border-secondary-base px-6 py-4 w-full">
      <Input
        label="Test name"
        required
        {...register("name")}
        error={errors?.name?.message}
      />
      <div className="flex items-center mt-2 gap-4">
        <Select
          name="position"
          {...register("position")}
          options={options}
          label='Position'
          placeholder=''
          required
          error={errors?.position?.message}
        />
        <Input
          {...register("levelPosition",)}
          label="Level position"
          required
          error={errors?.levelPosition?.message}
        />
      </div>

      <div className="flex items-center mt-2 gap-4">
        <Input
          {...register("timeLimit")}
          label="Set time limit (mins)"
          required
          error={errors?.timeLimit?.message}
        />
        <Select
          {...register("passingScore")}
          options={options}
          placeholder=''
          label='Passing score (Percentage %)'
          required
          error={errors?.passingScore?.message}
        />
      </div>
      <button hidden id="btn-test-info" onClick={handleSubmit(onSaveForm)} type="submit">Submit</button>
    </form>
  )
}
