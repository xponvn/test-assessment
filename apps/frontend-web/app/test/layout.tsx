'use client';
import React from 'react';
import { QuestionProvider } from './add/utils';

export default function TestPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QuestionProvider>{children}</QuestionProvider>;
}
