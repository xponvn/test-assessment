'use client'
import { useQuestion } from '../../add/utils';
import LayoutTestPage from '../../components/layout-test-page';

const LayoutEditTest = ({ children }: { children: React.ReactNode }) => {
  const { test } = useQuestion();
  return (
    <LayoutTestPage title={test.name} actionType="edit">
      {children}
    </LayoutTestPage>
  );
};

export default LayoutEditTest;
