"use client"
import React from 'react'
import TestInfo from './components/test-info'
import QuestionItem from './components/question-item';
import { Icon } from '@test-assessment/ui-components';
import { useRouter } from "next/navigation"

export default function SubmitedTestPage() {
  const router = useRouter()
  const data = {
    "name": "Test 2",
    "passingScore": 50,
    "position": {
      "data": {
        "attributes": {
          "name": "BE"
        }
      }
    },
    "level": "senior",
    "timeLimit": 60,
    "createdAt": "2023-04-25T19:26:48.920Z",
    "updatedAt": "2023-04-25T19:27:02.642Z",
    "publishedAt": "2023-04-25T19:27:02.638Z",
    "questions": [
      {
        "id": "3",
        "content": "Test question",
        "level": "easy",
        "answers": [
          {
            "content": "Answer 1",
            "isCorrect": true
          },
          {
            "content": "Answer 2",
            "isCorrect": false
          },
          {
            "content": "Answer 3",
            "isCorrect": true
          },
          {
            "content": "Answer 4",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "2",
        "content": "Test question 2",
        "level1": "hard"
      },
      {
        "id": "3",
        "content": "Test question",
        "level": "easy",
        "answers": [
          {
            "content": "Answer 1",
            "isCorrect": true
          },
          {
            "content": "Answer 2",
            "isCorrect": false
          },
          {
            "content": "Answer 3",
            "isCorrect": true
          },
          {
            "content": "Answer 4",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "2",
        "content": "Test question 2",
        "level1": "hard"
      },
      {
        "id": "3",
        "content": "Test question",
        "level": "easy",
        "answers": [
          {
            "content": "Answer 1",
            "isCorrect": true
          },
          {
            "content": "Answer 2",
            "isCorrect": false
          },
          {
            "content": "Answer 3",
            "isCorrect": true
          },
          {
            "content": "Answer 4",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "2",
        "content": "Test question 2",
        "level1": "hard"
      },
      {
        "id": "3",
        "content": "Test question",
        "level": "easy",
        "answers": [
          {
            "content": "Answer 1",
            "isCorrect": true
          },
          {
            "content": "Answer 2",
            "isCorrect": false
          },
          {
            "content": "Answer 3",
            "isCorrect": true
          },
          {
            "content": "Answer 4",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "2",
        "content": "Test question 2",
        "level1": "hard"
      },{
        "id": "3",
        "content": "Test question",
        "level": "easy",
        "answers": [
          {
            "content": "Answer 1",
            "isCorrect": true
          },
          {
            "content": "Answer 2",
            "isCorrect": false
          },
          {
            "content": "Answer 3",
            "isCorrect": true
          },
          {
            "content": "Answer 4",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "2",
        "content": "Test question 2",
        "level1": "hard"
      },
      {
        "id": "3",
        "content": "Test question",
        "level": "easy",
        "answers": [
          {
            "content": "Answer 1",
            "isCorrect": true
          },
          {
            "content": "Answer 2",
            "isCorrect": false
          },
          {
            "content": "Answer 3",
            "isCorrect": true
          },
          {
            "content": "Answer 4",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "2",
        "content": "Test question 2",
        "level1": "hard"
      },
      {
        "id": "3",
        "content": "Test question",
        "level": "easy",
        "answers": [
          {
            "content": "Answer 1",
            "isCorrect": true
          },
          {
            "content": "Answer 2",
            "isCorrect": false
          },
          {
            "content": "Answer 3",
            "isCorrect": true
          },
          {
            "content": "Answer 4",
            "isCorrect": false
          }
        ]
      },
      {
        "id": "2",
        "content": "Test question 2",
        "level1": "hard"
      }
    ]
  };
  const questions = data.questions || [];

  return (
    <div className="" >
      <div className="container mx-auto pt-6">
        <TestInfo
          testName={data.name}
          position={data.position.data.attributes.name}
          level={data.level}
          timeLimit={data.timeLimit}
          passingScore={data.passingScore}
        />

        <div className="mt-8 grid grid-cols-1 gap-16 overflow-auto" style={{ height: 'calc(100vh - 491.5px)'}}>
          {questions.map((item, index) => {
            return <QuestionItem 
              key={index}
              label={`Question ${index + 1}`}
              content={item.content}
              level={item.level1 || item.level}
              answers={item.answers || []}
            />
          })}
        </div>
        
        <div className="w-full py-7">
          <div className="cursor-pointer flex items-center w-fit" onClick={() =>  router.back()}>
            <Icon name="arrow-left" />
            <p className="text-13 font-semibold ml-3">Go back</p>
          </div>
        </div>
      </div>
    </div>
  )
}
