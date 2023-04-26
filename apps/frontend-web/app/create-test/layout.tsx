'use client';
import React from 'react';
import LayoutCreateTest from './components/block/layout-create-test';
import Button from './components/button';
import { QuestionProvider } from './utils';

export default function CreateTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuestionProvider>
      <LayoutCreateTest
        title="Create test"
        actions={
          <>
            <label
              htmlFor="btn-test-info"
              className="outline-none text-13 leading-20 font-bold py-[10px] px-5 uppercase text-secondary-base bg-neutral-white border-secondary-base border border-solid hover:bg-secondary-base hover:text-neutral-white transition-all mr-2 cursor-pointer"
            >
              SAVE AS DRAFT
            </label>
            <Button
              label="PUBLISH"
              style="style_2"
              onClick={() => alert('Publish Test')}
            />
          </>
        }
      >
        {children}
      </LayoutCreateTest>
    </QuestionProvider>
  );
}
