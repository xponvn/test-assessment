import { TestInput, useApiClient } from "@test-assessment/cms-graphql-api";
import { transformQuestionDuplicate } from "./helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TestDetailUtils = {
  onDuplicateTest: (id: string) => void;
  loading: boolean;
}

export default function useTestDetail(): TestDetailUtils {
  const { apiClient } = useApiClient()
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)

  const onDuplicateTest = async (id: string) => {
    try {
      if(loading) return;
      setLoading(true);
      const res = await apiClient.getTest({ id });
      const testDetail = res.test.data;
      if (!testDetail) {
        setLoading(false);
        return alert("Test not found.")
      };
      const testDetailAtr = testDetail.attributes;
      const newTest: TestInput = {
        name: `${testDetailAtr.name} ( Copy )`,
        passingScore: testDetailAtr.passingScore,
        timeLimit: testDetailAtr.timeLimit,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        questions: transformQuestionDuplicate(testDetailAtr.questions as any),
        position: testDetailAtr.position.data.id,
        level: testDetailAtr.level,
        publishedAt: null
      };
      const resDuplicateTest = await apiClient.createTest({ data: newTest });
      setLoading(false);
      const testDuplicateId = resDuplicateTest.createTest.data.id;
      if (testDuplicateId) return router.push(`/test/${testDuplicateId}/edit`);
      alert("Duplicate fail, pls check again.");
    } catch (err) {
      setLoading(false);
      const errors = err?.response?.errors || [];
      const messErrors = errors.map(item => item.message);
      if (messErrors.length > 0) return alert(messErrors[0])
    }
  };

  return {
    onDuplicateTest,
    loading
  }
}
