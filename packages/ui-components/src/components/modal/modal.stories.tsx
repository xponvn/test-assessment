/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta } from '@storybook/react';
import { Modal } from './modal';
import { Button } from '../button/button';
import { useState } from 'react';

const Story: Meta<typeof Modal> = {
  title: 'Components / Modal',
  component: Modal,
};
export default Story;

export const Default = (props: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button type="button" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={open}
        title="Add New Candidate"
        onCancel={() => alert('cancel')}
        onClose={() => setOpen(false)}
        onSubmit={() => alert('submit')}
        {...props}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu neque
          eget neque commodo viverra eget sit amet nunc. Curabitur vitae
          facilisis urna. Nulla facilisi. Aliquam blandit felis arcu, vitae
          molestie sapien viverra quis. Phasellus blandit nunc elit, in tempor
          diam feugiat ut. Aenean feugiat vulputate justo a tempus. Nullam
          tempus lorem eget condimentum auctor. Donec quis justo et sem semper
          ornare id et erat. Praesent eu ex eget nisl scelerisque dapibus. Ut
          quis ultrices sem. Maecenas eu ipsum laoreet, tristique ligula quis,
          auctor libero. Sed faucibus enim libero, eget fermentum mauris
          venenatis in. Praesent cursus ut justo eu hendrerit. In nec metus eget
          metus luctus congue id ac nisi. Aliquam laoreet mauris sem, vitae
          aliquam elit sagittis et. Sed rhoncus ornare nisi a congue.
        </p>
      </Modal>
    </div>
  );
};
