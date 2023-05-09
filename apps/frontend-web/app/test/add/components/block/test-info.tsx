import { yupResolver } from '@hookform/resolvers/yup';
import { useApiClient } from '@test-assessment/cms-graphql-api';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import useSWR from 'swr';
import * as yup from 'yup';
import {
  TestInfoType,
  getLevelPosition,
  transformPositions,
} from '../../utils';
import Select, { SelectOption } from '../form-base/select';
import { Input } from '@test-assessment/ui-components';

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
  disableEdit?: boolean;
  className?: string;
  onSaveAsDraft: (data: TestInfoType) => void;
};

export default function TestInfo({
  name = '',
  position = '',
  levelPosition = '',
  timeLimit = 1,
  passingScore = '80',
  disableEdit,
  className,
  onSaveAsDraft,
}: TestInfoProps) {
  const { apiClient } = useApiClient();
  const [positionOptions, setPositionOptions] = useState<SelectOption[]>([]);
  const {
    register,
    control,
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
  }, [name, position, levelPosition, timeLimit, passingScore, reset]);

  // TODO: handle fetching error later
  const { data } = useSWR({ sort: ['name'] }, apiClient.getPositions);

  useEffect(() => {
    if (data) {
      setPositionOptions(transformPositions(data.positions.data));
    }
  }, [data]);

  return (
    <form className="flex flex-col w-full gap-3">
      <Input
        label="Test name"
        required
        {...register('name')}
        disabled={disableEdit}
        error={errors?.name?.message}
        className="!w-full h-10"
      />

      <Controller
        control={control}
        name="position"
        render={({ field }) => (
          <Select
            {...field}
            name="position"
            options={positionOptions}
            label="Position"
            placeholder=""
            required
            disabled={disableEdit}
            error={errors?.position?.message}
          />
        )}
      />

      <Select
        name="Level position"
        {...register('levelPosition')}
        options={getLevelPosition()}
        label="Level position"
        placeholder=""
        required
        disabled={disableEdit}
        error={errors?.levelPosition?.message}
      />

      <Input
        {...register('timeLimit')}
        label="Set time limit (mins)"
        required
        disabled={disableEdit}
        error={errors?.timeLimit?.message}
        className="!w-full h-10"
      />

      <Select
        {...register('passingScore')}
        options={passingOptions}
        placeholder=""
        label="Passing score (Percentage %)"
        required
        disabled={disableEdit}
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
