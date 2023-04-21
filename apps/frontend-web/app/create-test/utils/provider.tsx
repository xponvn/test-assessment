/* eslint-disable @typescript-eslint/no-empty-function */
"use client"
import React, { createContext, useCallback, useState } from "react";
import { QuestionLevel, QuestionItemType, QuestionType, TestItem } from "./type";

export type QuestionContext = {
  test: TestItem;
  setTest: (_test: Partial<TestItem>) => void;

  questions: QuestionItemType[];
  addQuestion: (_question: Partial<QuestionItemType>, _index?: number) => void;
  deleteQuestion: (_index: number) => void;
};

const initState: QuestionContext = {
  test: {
    name: '',
    position: '',
    levelPosition: '',
    timeLimit: 0,
    passingScore: '',
    questions: []
  },
  setTest: (_test: Partial<TestItem>) => { },

  questions: [{
    content: "Bells lean sandwich intersection decisions close meaningful ui and lot?",
    correctAnswer: "answer-0",
    level: QuestionLevel.Easy,
    type: QuestionType.SingleChoice,
    answers: [
      { content: "Sop alpha shark horse assassin with options individual." },
      { content: "Invested read expectations high-level walk customer nobody strategy close." },
      { content: "Our join domains optimize roll we've teeth container." },
      { content: "Hands territories we then later looking buy-in alpha sandwich." },
    ]
  }],
  addQuestion: (_question: Partial<QuestionItemType>, _index?: number,) => { },
  deleteQuestion: (_index: number) => { }
}

const QuestionContext = createContext<QuestionContext>(initState);

export type QuestionProps = {
  children: JSX.Element | React.ReactNode;
};

export function QuestionProvider(props: QuestionProps) {
  const [test, setTestState] = useState<TestItem>(initState.test);
  const [questions, setQuestionsState] = useState<QuestionItemType[]>([]);

  const addQuestion = useCallback((newQuestion: QuestionItemType, index?: number) => {
    const newQuestions = [...questions];
    // if (!isEdit) newQuestions.push(newQuestion);
    // // update question at location index
    // if (index !== undefined && isEdit) {
    //   newQuestions.splice(index, 1, newQuestion)
    // }
    if (index >= 0 && index < questions.length) newQuestions.splice(index, 1, newQuestion)
    else newQuestions.push(newQuestion)
    setQuestionsState(newQuestions);
  }, [questions]);

  const deleteQuestion = useCallback((index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestionsState(newQuestions);
  }, [questions]);

  const setTest = useCallback((newTest: Partial<TestItem>) => {
    setTestState((test) => ({ ...test, ...newTest }));
  }, []);

  return (
    <QuestionContext.Provider value={{
      test,
      setTest,

      questions,
      addQuestion,
      deleteQuestion
    }}>
      {props.children}
    </QuestionContext.Provider>
  );
}

export const useQuestion = () => React.useContext(QuestionContext);
