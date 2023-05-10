import { useCallback } from 'react';
import { HookCallbacks } from '../hooks/useDeleteTest';
import useSWRMutation from 'swr/mutation';
import { useApiClient } from '@test-assessment/cms-graphql-api';
import {
  QuestionItemType,
  TestItem,
  transformDataSubmit,
} from '../test/add/utils';

export const usePublishTest = ({
  id,
  test,
  questions,
  onSuccess,
  onError,
}: {
  id: string;
  test: TestItem;
  questions: QuestionItemType[];
} & HookCallbacks) => {
  const { apiClient } = useApiClient();
  const onPublish = useCallback(async () => {
    try {
      const formattedInput = transformDataSubmit(
        { ...test, publishedAt: new Date() },
        questions
      );
      const updatedTest = await apiClient.updateTest({
        id,
        data: formattedInput,
      });
      if (onSuccess) onSuccess();
      return updatedTest;
    } catch (e) {
      console.error(e);
      if (onError) onError();
    }
  }, [test, questions, apiClient, id, onSuccess, onError]);

  const { isMutating, data, trigger } = useSWRMutation(id, onPublish);

  return { isMutating, data, trigger };
};
