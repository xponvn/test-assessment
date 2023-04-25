'use client';

import { RenderIcon } from "@test-assessment/ui-components";

export default function Home() {
  return (
    <div className="flex items-center justify-center text-48 leading-64">
      Welcome To <p className="ml-3 text-primary-base">TEST ASSESSMENT</p>
      <RenderIcon
        name="arrow-right"
        className="text-neutral-placeholder"
      />
    </div>
  );
}
