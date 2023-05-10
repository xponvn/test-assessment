'use client';
import { TestEntity } from '@test-assessment/cms-graphql-api';
import { Button, Icon } from '@test-assessment/ui-components';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDeleteTest } from '../../hooks/useDeleteTest';
import { usePublishTest } from '../../hooks/usePublishTest';
import { getTotalPoint, useQuestion } from '../add/utils';
import { ModalContext } from '../layout';
import '../styles/style.css';
import { transformTestData } from '../utils/helper';
import AvatarDropdown from './avatar-dropdown';
import BreadCrumb from './breadcrumb';
import InputSearch from './input-search';

interface Props {
  title?: string;
  actionType: 'add' | 'edit' | undefined;
  children: React.ReactNode;
}

const breadcrumbOtp = ['Test management', 'Candidate'];

const LayoutTestPage = ({
  title = 'test management',
  actionType,
  children,
}: Props) => {
  const [breadCrumbActive, setBreadCrumbActive] = useState<string>(
    breadcrumbOtp[0]
  );
  const router = useRouter();
  const { questions, test, setTest } = useQuestion();
  const { setModalState } = useContext(ModalContext);

  const onCancel = useCallback(() => {
    setModalState({ isDisplay: false });
  }, [setModalState]);

  const onDeleteSuccess = useCallback(() => {
    setModalState({ isDisplay: false });
    // TODO: display success notification
    redirect('/test');
  }, [setModalState]);

  const onDeleteError = useCallback(() => {
    setModalState({ isDisplay: false });
    // TODO: display success notification
  }, [setModalState]);

  const onPublishError = useCallback(() => {
    // TODO: display error notification
  }, [setModalState]);

  const { trigger: triggerDelete, isMutating: isDeleting } = useDeleteTest({
    id: test.id,
    onSuccess: onDeleteSuccess,
    onError: onDeleteError,
  });
  const { trigger, data, isMutating } = usePublishTest({
    id: test.id,
    test,
    questions,
    onError: onPublishError,
  });

  const deleteModalActions = useMemo(() => {
    return (
      <div className="flex flex-row justify-end space-x-2 mt-8">
        <Button
          type="button"
          onClick={onCancel}
          className="bg-white uppercase"
          style={{ fontSize: '15px', fontWeight: 700 }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => triggerDelete()}
          className="uppercase font-bold"
          style={{ fontSize: '15px', fontWeight: 700 }}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </div>
    );
  }, [onCancel, triggerDelete, isDeleting]);

  useEffect(() => {
    if (data) {
      const formattedData = transformTestData(
        data.updateTest.data as TestEntity
      );
      setTest(formattedData);
    }
  }, [data, setTest]);

  const onDeleteTest = () => {
    setModalState({
      isDisplay: true,
      title: 'Are you sure?',
      content: (
        <div className="text-15 leading-20">
          <p>Are you sure you want to delete this test?</p>
          <br />
          <p>
            Warning: All the candidate data associated with this test will be
            deleted.
          </p>
        </div>
      ),
      actions: deleteModalActions,
    });
  };

  const renderActions = () => {
    if (actionType === 'add' || actionType === 'edit') {
      return (
        <div className="flex items-center">
          <div className="mr-6 text-neutral-border text-15 leading-24">
            Total point:{' '}
            <span className="font-bold text-neutral-white">
              {getTotalPoint(questions)}
            </span>
          </div>
          <span className="border border-solid w-6 h-0 rotate-90 border-neutral-placeholder mr-6"></span>
          {actionType === 'edit' && (
            <Button
              type="button"
              onClick={onDeleteTest}
              className="ml-2 uppercase bg-white"
              RightIcon={
                <Icon
                  name="remove"
                  className="text-neutral-text-primary ml-2"
                />
              }
            >
              Delete
            </Button>
          )}

          <label
            htmlFor="btn-test-info"
            className={`outline-none text-13 leading-6 font-bold py-[10px] px-5 uppercase text-neutral-white border-primary-base border-[3px] border-solid hover:bg-primary-base hover:text-neutral-text-primary transition-all mr-2 cursor-pointer flex items-center max-h-10 ${
              test.publishedAt ? 'opacity-30 pointer-events-none' : ''
            }`}
          >
            save as draft
          </label>
          <Button
            type="button"
            onClick={() => trigger()}
            className={`uppercase !font-bold ${test?.publishedAt ? 'opacity-30' : ''}`}
            // FIXME: should be loading icon
            disabled={!!test?.publishedAt || isMutating}
          >
            publish
          </Button>
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <InputSearch
          onSearch={(value) => router.push(`/test?q=${value}`)}
          className="w-[448px] mr-6"
        />
        <Button
          type="button"
          onClick={() => router.push('/test/add')}
          LeftIcon={<Icon name="plus" />}
        >
          Create test
        </Button>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="bg-neutral-text-primary h-[270px]">
        <div className="container mx-auto pt-4">
          {/** HEADER */}
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                width={74.78}
                height={24}
                src="/images/logo/logo.svg"
                alt="logo"
              />
            </Link>
            <div>
              <BreadCrumb
                options={breadcrumbOtp}
                onActive={(item) => setBreadCrumbActive(item)}
                active={breadCrumbActive}
              />
            </div>
            <div className="flex items-center">
              <div
                className="relative cursor-pointer w-fit"
                onClick={() => alert('Notification Click.')}
              >
                <Icon name="notification" className="text-white" />
                <span className="absolute top-0 right-[1px] bottom-0 w-2 h-2 bg-error-base border-[2px] border-solid border-neutral-text-secondary rounded-full"></span>
              </div>
              <span className="block w-4 border-[1px] border-solid border-neutral-placeholder rotate-90 mx-4"></span>
              <AvatarDropdown />
            </div>
          </div>

          {/** ACTION */}
          <div className="flex items-center justify-between mt-8">
            <p className="uppercase font-bold text-24 leading-8 text-neutral-white">
              {title}
            </p>
            {renderActions()}
          </div>
        </div>
      </div>

      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

export default LayoutTestPage;
