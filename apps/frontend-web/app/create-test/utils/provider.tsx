/* eslint-disable @typescript-eslint/no-empty-function */
"use client"
import React, { createContext, useCallback, useState } from "react";
import { QuestionDifficulty, QuestionItemType, QuestionType, TestItem } from "./type";

export type CreateTestContext = {
  test: TestItem;
  questions: QuestionItemType[];
  isSaveQuestion: boolean;
  saveQuestion: (_question: Partial<QuestionItemType>) => void;
  setTest: (_test: Partial<TestItem>) => void;
  setIsSaveQuestion: (value: boolean) => void;
};

const initState: CreateTestContext = {
  test: {
    name: '',
    position: '',
    levelPosition: '',
    timeLimit: '',
    passingScore: '',
    questions: []
  },
  isSaveQuestion: false,
  questions: [],
  saveQuestion: (_question: Partial<QuestionItemType>) => { },
  setTest: (_test: Partial<TestItem>) => { },
  setIsSaveQuestion: (_value: boolean) => { }
}

const CreateContext = createContext<CreateTestContext>(initState);

export type CreateTestProps = {
  children: JSX.Element | React.ReactNode;
};

export function CreateTestProvider(props: CreateTestProps) {
  const [questions, setQuestionsState] = useState<QuestionItemType[]>([{
    content: "Bells lean sandwich intersection decisions close meaningful ui and lot?",
    correctAnswer: "answer-0",
    difficulty: QuestionDifficulty.Easy,
    type: QuestionType.SingleChoice,
    answers: [
      { content: "Sop alpha shark horse assassin with options individual." },
      { content: "Invested read expectations high-level walk customer nobody strategy close." },
      { content: "Our join domains optimize roll we've teeth container." },
      { content: "Hands territories we then later looking buy-in alpha sandwich." },
    ]
  }]);
  const [isSaveQuestion, setIsSaveQuestionSate] = useState<boolean>(false);
  const [test, setTestState] = useState<TestItem>(initState.test);

  const saveQuestion = useCallback((newQuestion: QuestionItemType) => {
    const newQuestions = [...questions];
    newQuestions.push(newQuestion);
    setQuestionsState(newQuestions);
    setIsSaveQuestionSate(true)
  }, []);

  const setTest = useCallback((newTest: Partial<TestItem>) => {
    setTestState((test) => ({ ...test, newTest }));
  }, []);

  const setIsSaveQuestion = (value: boolean) => {
    setIsSaveQuestionSate(value)
  }

  return (
    <CreateContext.Provider value={{ questions, test, saveQuestion, setTest, isSaveQuestion, setIsSaveQuestion }}>
      {props.children}
    </CreateContext.Provider>
  );
}

export const useCreateTest = () => React.useContext(CreateContext);
