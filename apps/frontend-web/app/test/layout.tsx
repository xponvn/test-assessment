"use client"
import React from 'react'
import { QuestionProvider } from './add/utils'
import LayoutTestPage from './components/layout-test-page'
import './styles/style.css'

export default function TestPageLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <QuestionProvider>
      <LayoutTestPage>
        {children}
      </LayoutTestPage>
    </QuestionProvider>
  )
}
