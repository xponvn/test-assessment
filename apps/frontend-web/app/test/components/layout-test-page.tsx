'use client';
import { TestEntity, useApiClient } from '@test-assessment/cms-graphql-api';
import { Button, Icon } from '@test-assessment/ui-components';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import {
  getTotalPoint,
  transformDataSubmit,
  useQuestion
} from '../add/utils';
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
  const { apiClient } = useApiClient();
  const { questions, test, setTest } = useQuestion();

  const onPublishTest = useCallback(
    async (id: string) => {
      const formattedInput = transformDataSubmit(
        { ...test, publishedAt: new Date() },
        questions
      );
      const updatedTest = await apiClient.updateTest({
        id,
        data: formattedInput,
      });
      return updatedTest;
    },
    [test, questions, apiClient]
  );

  const { trigger, data, isMutating } = useSWRMutation(test.id, onPublishTest);

  useEffect(() => {
    if (data) {
      const formattedData = transformTestData(
        data.updateTest.data as TestEntity
      );
      setTest(formattedData);
    }
  }, [data, setTest]);

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
              onClick={() => alert('test is deleted')}
              className="mr-2 uppercase max-h-10 bg-transparent text-neutral-white !font-bold hover:bg-primary-base hover:text-neutral-text-primary"
              variant="secondary"
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
