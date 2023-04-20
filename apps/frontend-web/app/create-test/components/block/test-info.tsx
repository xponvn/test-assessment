import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { TestInfoType } from '../../utils';
import Input from '../form-base/input';
import Select, { SelectOption } from '../form-base/select';

const passingOptions = [{ label: "80%", value: "80" }, { label: "70%", value: "70" }, { label: "60%", value: "60" }, { label: "50%", value: "50" },];
export type TestInfoProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  otpPositions: SelectOption[];
  onSaveAsDraft: (data: TestInfoType) => void;
}
export default function TestInfo({
  otpPositions,
  onSaveAsDraft
}: TestInfoProps) {
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
      timeLimit: 0,
      passingScore: "80",
    },
    resolver: yupResolver(schema)
  });

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
          options={otpPositions}
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
          options={passingOptions}
          placeholder=''
          label='Passing score (Percentage %)'
          required
          error={errors?.passingScore?.message}
        />
      </div>
      <button hidden id="btn-test-info" onClick={handleSubmit(onSaveAsDraft)} type="submit">Submit</button>
    </form>
  )
}
