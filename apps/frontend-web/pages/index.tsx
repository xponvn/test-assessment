import { Button } from '@test-assessment/ui-components';

export function Index() {
  return (
    <>
      <p className="text-danger">testing tailwind functionality</p>
      <Button onClick={() => alert('This is demo button')}>
        This is test button
      </Button>
    </>
  );
}

export default Index;
