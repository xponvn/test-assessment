import { useApiClient } from '@test-assessment/cms-graphql-api';
import { useCallback } from 'react';
import useSWRMutation from 'swr/mutation';

export type HookCallbacks = {
  onSuccess?: () => void;
  onError?: () => void;
};

export const useDeleteTest = ({
  id,
  onSuccess,
  onError,
}: {
  id: string;
} & HookCallbacks) => {
  const { apiClient } = useApiClient();

  const onDelete = useCallback(async () => {
    try {
      const deletedTest = await apiClient.deleteTest({ id });
      if (onSuccess) onSuccess();
      return deletedTest;
    } catch (e) {
      console.error(e);
      if (onError) onError();
    }
  }, [apiClient, id, onSuccess, onError]);
  const { isMutating, data, trigger } = useSWRMutation(id, onDelete);

  return { isMutating, data, trigger };
};
