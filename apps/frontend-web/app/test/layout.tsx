'use client';
import React, { createContext, useState } from 'react';
import { QuestionProvider } from './add/utils';
import Modal, { ModalProps } from './components/modal';

interface ModalState extends ModalProps {
  isDisplay: boolean;
}

export const ModalContext = createContext<{
  modalState: ModalState;
  setModalState?: React.Dispatch<React.SetStateAction<ModalState>>;
}>({
  modalState: { isDisplay: false },
});

export default function TestPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalState, setModalState] = useState<ModalState>({
    isDisplay: false,
  });

  return (
    <ModalContext.Provider value={{ modalState, setModalState }}>
      <QuestionProvider>
        {modalState.isDisplay && (
          <div className="bg-neutral-transparent w-full fixed h-full z-10">
            <Modal />
          </div>
        )}
        <div
          className={`${
            modalState.isDisplay ? 'pointer-events-none' : ''
          }`}
        >
          {children}
        </div>
      </QuestionProvider>
    </ModalContext.Provider>
  );
}
