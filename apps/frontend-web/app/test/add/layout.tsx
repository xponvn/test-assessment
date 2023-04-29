import LayoutTestPage from '../components/layout-test-page';

const LayoutCreateTest = ({ children }: { children }) => {
  return (
    <LayoutTestPage title="Create test" actionType="add">
      {children}
    </LayoutTestPage>
  );
};

export default LayoutCreateTest;
