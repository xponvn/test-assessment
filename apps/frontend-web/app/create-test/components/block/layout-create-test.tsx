import React, { ReactNode } from 'react'
import { RenderIcon } from '../../icons';
import { getTotalPoint, useQuestion } from '../../utils';

type LayoutCreateTesProps = {
  title: string;
  actions: JSX.Element | ReactNode;
  children: JSX.Element | ReactNode;
};

export default function LayoutCreateTest({ title, actions, children }: LayoutCreateTesProps) {
  const { questions } = useQuestion()
  return (
    <div style={{ height: `calc(100vh - 64px)` }}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-neutral-text-primary">
          <p className='leading-48 font-bold text-32 capitalize'>{title}</p>
          <div className="text-primary-base flex items-center cursor-pointer"><span className="underline text-15 leading-24 font-normal">How to create a test</span> <span><RenderIcon name="qa" /></span></div>
        </div>
        <div className="flex items-center">
          <div className="mr-6 text-neutral-text-primary text-15 leading-24">Total point: <span className="font-bold">{getTotalPoint(questions)} points</span></div>
          {actions}
        </div>
      </div>
      <div className="bg-secondary-background">
        {children}
      </div>
    </div>
  )
}
