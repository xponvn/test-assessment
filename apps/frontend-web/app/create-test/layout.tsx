import React from 'react'
import Button from './components/button'
import { RenderIcon } from './icons'

export default function CreateTestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ height: `calc(100vh - 64px)` }}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-neutral-text-primary">
          <p className='leading-48 font-bold text-32'>Create Test</p>
          <div className="text-primary-base flex items-center cursor-pointer"><span className="underline text-15 leading-24 font-normal">How to create a test</span> <span><RenderIcon name="qa" /></span></div>
        </div>
        <div className="flex items-center">
          <div className="mr-6 text-neutral-text-primary text-15 leading-24">Total point: <span className="font-bold">xx points</span></div>
          <Button label="SAVE AS DRAFT" className="mr-2" />
          <Button label="PUBLISH" style="style_2" />
        </div>
      </div>
      <div className="bg-secondary-background">
        {children}
      </div>
    </div>
  )
}
