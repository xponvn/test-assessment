import { yupResolver } from '@hookform/resolvers/yup';
import { useApiClient } from '@test-assessment/cms-graphql-api';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';
import {
  TestInfoType,
  getLevelPosition,
  transformPositions,
} from '../../utils';
import Input from '../form-base/input';
import Select, { SelectOption } from '../form-base/select';

const passingOptions = [
  { label: '80%', value: '80' },
  { label: '70%', value: '70' },
  { label: '60%', value: '60' },
  { label: '50%', value: '50' },
];

export type TestInfoProps = {
  name?: string;
  position?: string;
  levelPosition?: string;
  timeLimit?: number;
  passingScore?: string;
  onSaveAsDraft: (data: TestInfoType) => void;
};

export default function TestInfo({
  name = '',
  position = '',
  levelPosition = '',
  timeLimit = 1,
  passingScore = '80',
  onSaveAsDraft,
}: TestInfoProps) {
  // FIXME: should be more to some where else later.
  const schema = yup
    .object({
      name: yup.string().required('Required field.'),
      position: yup.string().required('Required field.'),
      levelPosition: yup.string().required('Required field.'),
      timeLimit: yup
        .number()
        .typeError('Field must be number.')
        .required('Required field.'),
      passingScore: yup.string().required('Required field.'),
    })
    .required();

  const { apiClient } = useApiClient();
  const [positionOptions, setPositionOptions] = useState<SelectOption[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestInfoType>({
    defaultValues: useMemo(() => {
      return {
        name,
        position,
        levelPosition,
        timeLimit,
        passingScore,
      };
    }, [name, position, levelPosition, timeLimit, passingScore]),
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset({
      name,
      position,
      levelPosition,
      timeLimit,
      passingScore,
    });
  }, [name, position, levelPosition, timeLimit, passingScore]);

  // TODO: handle fetching error later
  const { data } = useSWR({ sort: ['name'] }, apiClient.getPositions);

  useEffect(() => {
    if (data) {
      setPositionOptions(transformPositions(data.positions.data));
    }
  }, [data]);

  return (
    <form className="flex flex-col w-full gap-4 px-6 py-4 border border-solid border-secondary-base bg-secondary-background">
      <Input
        label="Test name"
        required
        {...register('name')}
        error={errors?.name?.message}
      />
      <Select
        name="position"
        {...register('position')}
        options={positionOptions}
        label="Position"
        placeholder=""
        required
        error={errors?.position?.message}
      />
      <Select
        name="Level position"
        {...register('levelPosition')}
        options={getLevelPosition()}
        label="Level position"
        placeholder=""
        required
        error={errors?.levelPosition?.message}
      />
      <Input
        {...register('timeLimit')}
        label="Set time limit (mins)"
        required
        error={errors?.timeLimit?.message}
      />
      <Select
        {...register('passingScore')}
        options={passingOptions}
        placeholder=""
        label="Passing score (Percentage %)"
        required
        error={errors?.passingScore?.message}
      />
      <button
        hidden
        id="btn-test-info"
        onClick={handleSubmit(onSaveAsDraft)}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
