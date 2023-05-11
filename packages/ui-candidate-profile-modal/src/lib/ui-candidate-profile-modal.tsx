import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Input, SelectBox } from '@test-assessment/ui-components';
import levels from './levels.json';
import positions from './positions.json';
import { DualColumnRow, Row } from './components';
import { candidateSchema } from './validation';
import { useApiClient } from '@test-assessment/cms-graphql-api';

type CandidateForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  level: string;
  resume: string;
  comment: string;
};

export interface UiCandidateProfileModalProps {
  open: boolean;
}

export function UiCandidateProfileModal({
  open,
}: UiCandidateProfileModalProps) {
  const { apiClient } = useApiClient();
  const [isOpen, setOpen] = useState(open);
  const toggleModal = () => setOpen(!open);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CandidateForm>({
    resolver: yupResolver(candidateSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      // @ts-expect-error del later
      delete data?.resume;
      // @ts-expect-error del later
      delete data.comment;
      await apiClient.createCandidate({ data });
      alert('success');
    } catch (e) {
      // TODO: handle error with popup
      console.log(e);
    }
  });

  return (
    <Modal
      open={isOpen}
      title="New Candidate Profile"
      onClose={toggleModal}
      submitText="Submit"
      onSubmit={onSubmit}
    >
      <form>
        <DualColumnRow
          firstCol={
            <Input
              label="First name"
              fill
              {...register('firstName')}
              error={errors.firstName?.message}
            />
          }
          secondCol={
            <Input
              label="Last name"
              fill
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          }
        />
        <Row>
          <Input
            label="Email address"
            required
            fill
            {...register('email')}
            error={errors.email?.message}
          />
        </Row>
        <Row>
          <Input
            label="Phone"
            fill
            {...register('phone')}
            error={errors.phone?.message}
          />
        </Row>
        <DualColumnRow
          firstCol={
            <SelectBox
              placeholder="Select"
              size="medium"
              label="Position"
              options={positions.options}
              variant="vertical-label"
              {...register('position')}
            />
          }
          secondCol={
            <SelectBox
              placeholder="Select"
              size="medium"
              label="Level"
              options={levels.options}
              variant="vertical-label"
              {...register('level')}
            />
          }
        />
        <Row>
          <Input
            label="CV/Resume (pdf, doc only)"
            type="file"
            fill
            leftIcon="file"
            {...register('resume')}
            error={errors.resume?.message}
          />
        </Row>
        <Row noMargin>
          <Input
            label="Note"
            fill
            {...register('comment')}
            error={errors.comment?.message}
          />
        </Row>
      </form>
    </Modal>
  );
}

export default UiCandidateProfileModal;
