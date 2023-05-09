import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Input, SelectBox } from '@test-assessment/ui-components';
import levels from './levels.json';
import positions from './positions.json';
import { DualColumnRow, Row } from './components';
import { candidateSchema } from './validation';

type CandidateForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  level: string;
  cv: File;
  note: string;
};

export interface UiCandidateProfileModalProps {
  open: boolean;
}

export function UiCandidateProfileModal({
  open,
}: UiCandidateProfileModalProps) {
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

  const onSubmit = handleSubmit((data) => {
    console.log('submitting...', data);
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
            {...register('cv')}
            error={errors.cv?.message}
          />
        </Row>
        <Row noMargin>
          <Input
            label="Note"
            fill
            {...register('note')}
            error={errors.note?.message}
          />
        </Row>
      </form>
    </Modal>
  );
}

export default UiCandidateProfileModal;
