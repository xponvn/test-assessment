import Input from './input';
import Select, { SelectOption } from './select';
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

  const { control } = useForm({
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
        name="testName"
        control={control}
        label="Test name"
        required
      />
      <div className="flex items-center mt-2 gap-4">
        <Select
          name="position"
          control={control}
          options={options}
          label='Position'
          placeholder=''
          required
        />
        <Input
          name="levelPosition"
          control={control}
          label="Level position"
          required
        />
      </div>

      <div className="flex items-center mt-2 gap-4">
        <Input
          name="timeLimit"
          control={control}
          label="Set time limit (mins)"
          required
        />
        <Select
          name="passingScore"
          control={control}
          options={options}
          placeholder=''
          label='Passing score (Percentage %)'
          required
        />
      </div>
    </div>
  )
}
