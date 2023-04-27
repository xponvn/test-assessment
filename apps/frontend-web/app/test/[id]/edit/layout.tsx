'use client';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

const TestFormLayout = ({ children, params }: Props) => {
  return (
    <>
      {children}
    </>
  );
};

export default TestFormLayout;
