/* eslint-disable @typescript-eslint/no-empty-function */
'use client';
import React, { createContext, useCallback, useState } from 'react';
import { QuestionItemType, TestItem } from './type';

export type QuestionContext = {
  test: TestItem;
  setTest: (_test: Partial<TestItem>) => void;
  questions: QuestionItemType[];
  setQuestionsState?: React.Dispatch<React.SetStateAction<QuestionItemType[]>>;
  addQuestion: (_question: Partial<QuestionItemType>, _index?: number) => void;
  deleteQuestion: (_index: number) => void;
  setQuestions: (items: QuestionItemType[]) => void;
};

const initState: QuestionContext = {
  test: {
    name: '',
    position: '',
    levelPosition: '',
    timeLimit: 0,
    passingScore: '',
    questions: [],
  },
  setTest: (_test: Partial<TestItem>) => {},
  questions: [],
  addQuestion: (_question: Partial<QuestionItemType>, _index?: number) => {},
  deleteQuestion: (_index: number) => {},
  setQuestions: (items: QuestionItemType[]) => {},
};

const QuestionContext = createContext<QuestionContext>(initState);

export type QuestionProps = {
  children: JSX.Element | React.ReactNode;
};

export function QuestionProvider(props: QuestionProps) {
  const [test, setTestState] = useState<TestItem>(initState.test);
  const [questions, setQuestionsState] = useState<QuestionItemType[]>([]);

  const addQuestion = useCallback(
    (newQuestion: QuestionItemType, index?: number) => {
      const newQuestions = [...questions];
      if (index >= 0 && index < questions.length)
        newQuestions.splice(index, 1, newQuestion);
      else newQuestions.push(newQuestion);
      setQuestionsState(newQuestions);
    },
    [questions]
  );

  const deleteQuestion = useCallback(
    (index: number) => {
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestionsState(newQuestions);
    },
    [questions]
  );

  const setQuestions = useCallback((items: QuestionItemType[]) => {
    setQuestionsState(items);
  }, []);

  const setTest = useCallback((newTest: Partial<TestItem>) => {
    setTestState((test) => ({ ...test, ...newTest }));
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        test,
        setTest,
        questions,
        setQuestionsState,
        addQuestion,
        deleteQuestion,
        setQuestions,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
}

export const useQuestion = () => React.useContext(QuestionContext);
