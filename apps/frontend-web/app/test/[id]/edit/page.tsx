'use client';
import { TestEntity, useApiClient } from '@test-assessment/cms-graphql-api';
import { useEffect } from 'react';
import useSWR from 'swr';
import '../../add/styles/style.css';
import {
  TestInfoType,
  transformDataSubmit,
  useQuestion,
} from '../../add/utils';
import TestForm from '../../components/test-form';
import { transformTestData } from '../../utils/helper';

interface Props {
  children?: React.ReactNode;
  params: { id: string };
}

const EditDraftTestPage = ({ params }: Props) => {
  const { apiClient } = useApiClient();
  const {
    setTest,
    test,
    questions,
    setQuestionsState: setQuestions,
    setIsLoading,
  } = useQuestion();
  const { data, isLoading, mutate } = useSWR(
    { id: params.id },
    apiClient.getTest
  );

  // for display loading screen while fetching data
  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    if (data) {
      const testData = transformTestData(data?.test?.data as TestEntity);
      setTest(testData);
    }
  }, [data, setTest]);

  useEffect(() => {
    if (test.questions) {
      setQuestions(test.questions);
    }
  }, [setQuestions, test.questions]);

  const onSave = async (data: TestInfoType) => {
    if (!questions || questions.length <= 0)
      return alert('Question must be greater than or equal to 1.');
    setTest({ ...data, questions: questions });
    const dataTransform = transformDataSubmit(data, questions);
    await apiClient.updateTest({ id: params.id, data: dataTransform });
    mutate();
  };

  return <TestForm onSave={onSave} />;
};

export default EditDraftTestPage;
