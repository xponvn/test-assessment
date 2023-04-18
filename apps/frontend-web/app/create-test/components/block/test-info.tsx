import Input from '../form-base/input';
import Select, { SelectOption } from '../form-base/select';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";

export type TestInfoProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: SelectOption[]
}
export default function TestInfo({
  options
}: TestInfoProps) {

  const schema = yup.object({
    testName: yup.string().required(),
    position: yup.string().required(),
    levelPosition: yup.string().required(),
    timeLimit: yup.number().required(),
    passingScore: yup.string().required(),
  }).required();

  const { register } = useForm({
    defaultValues: {
      testName: '',
      position: '',
      levelPosition: '',
      timeLimit: '',
      passingScore: '',
    },
    resolver: yupResolver(schema)
  });
  return (
    <div className="border border-solid border-secondary-base px-6 py-4 w-full">
      <Input
        label="Test name"
        required
        {...register("testName")}
      />
      <div className="flex items-center mt-2 gap-4">
        <Select
          name="position"
          {...register("position")}
          options={options}
          label='Position'
          placeholder=''
          required
        />
        <Input
          {...register("levelPosition", )}
          label="Level position"
          required
        />
      </div>

      <div className="flex items-center mt-2 gap-4">
        <Input
          {...register("timeLimit")}
          label="Set time limit (mins)"
          required
        />
        <Select
          {...register("passingScore")}
          options={options}
          placeholder=''
          label='Passing score (Percentage %)'
          required
        />
      </div>
    </div>
  )
}
