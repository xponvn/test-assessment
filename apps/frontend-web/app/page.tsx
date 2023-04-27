'use client';
import { Icon } from '@test-assessment/ui-components';

export default function Home() {
  return (
    <div className="flex items-center justify-center text-48 leading-64">
      Welcome To <p className="ml-3 text-primary-base">TEST ASSESSMENT</p>
      <Icon
        name="arrow-left"
        className="text-neutral-placeholder"
      />
    </div>
  );
}
