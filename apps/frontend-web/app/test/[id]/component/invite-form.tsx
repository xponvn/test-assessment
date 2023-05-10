import React from 'react';
import Select from '../../add/components/form-base/select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InviteCandidateInput, useTestContext } from '../provider';
import { transformCandidates } from '../utils/helper';
import * as yup from 'yup';
import { Input } from '@test-assessment/ui-components';

const InviteForm = ({ setShowModal }) => {
  const { testId, candidates } = useTestContext();
  const candidateSelectOpts = transformCandidates(candidates);

  // Validation
  const InviteCandidateSchema = yup.object().shape({
    candidatesEmails: yup
      .array()
      .transform(function (value, originalValue) {
        if (this.isType(value) && value !== null) {
          return value;
        }
        return originalValue ? originalValue.split(/[\s,]+/) : [];
      })
      .of(yup.string().email(({ value }) => `${value} is not a valid email`))
      .required('Email is required!'),
  });

  // Form
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm({
    defaultValues: {
      selectedCandidate: { name: '', email: '' },
      candidatesEmails: '',
    },
    resolver: yupResolver(InviteCandidateSchema),
    mode: 'onChange',
  });

  // handle form submit
  const onSubmit = async (data: InviteCandidateInput) => {
    try {
      const emails = data.candidatesEmails.includes(',')
        ? data.candidatesEmails.split(',')
        : data.candidatesEmails;

      const url = `${process.env.NEXT_PUBLIC__REST_URL}/tests/${testId}/candidate`;
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        },
        body: JSON.stringify({
          emails,
        }),
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log('ERROR:', error);
    }
  };

  const handleErrMessage = () => {
    let message = '';
    (errors?.candidatesEmails as any)?.map((err) => {
      if (err.message) {
        message += err?.message;
      }
    });
    return message;
  };

  console.log(handleErrMessage());

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setShowModal(false);
    }
  }, [isSubmitSuccessful, reset, setShowModal]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">Invite Candidate</h3>
            <button
              className="p-1 ml-auto border-0 text-black   float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="w-4 inline-block text-3xl font-semibold">x</span>
            </button>
          </div>

          {/*body*/}
          <div className="relative p-6 flex-auto">
            <Select
              label="Select candidate"
              {...register('selectedCandidate')}
              options={candidateSelectOpts}
              placeholder="Select Candidate"
              error={errors.selectedCandidate?.message}
            />
            <Input
              className="pt-6"
              label="Via email"
              {...register('candidatesEmails')}
              placeholder="Separate emails by commas: foo@bar.com, bar@foo.com"
              error={handleErrMessage()}
            />
          </div>

          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="bg-emerald-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              confirm
            </button>
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}
            >
              cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default InviteForm;
