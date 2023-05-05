import { TestInput, useApiClient } from "@test-assessment/cms-graphql-api";
import { transformQuestionDuplicate } from "./helper";
import { useRouter } from "next/navigation";

type TestDetailUtils = {
  onDuplicateTest: () => void;
}

export default function useTestDetail({ testId }): TestDetailUtils {
  const { apiClient } = useApiClient()
  const router = useRouter();

  const onDuplicateTest = async () => {
    try {
      const res = await apiClient.getTest({ id: testId });
      const testDetail = res.test.data;
      if (!testDetail) return alert("Test not found.");
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
      const testDuplicateId = resDuplicateTest.createTest.data.id;
      if (testDuplicateId) return router.push(`/test/${testId}/edit`);
      alert("Duplicate fail, pls check again.");
    } catch (err) {
      const errors = err?.response?.errors || [];
      const messErrors = errors.map(item => item.message);
      if (messErrors.length > 0) return alert(messErrors[0])
    }
  };

  return {
    onDuplicateTest
  }
}
