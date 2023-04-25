"use client"
import React, { Fragment, useState } from 'react'
import Image from "next/image"
import BreadCrumb from './components/breadcrumb'
import { RenderIcon } from './icons'
import AvatarDropdown from './components/avatar-dropdown'
import './styles/style.css';
import InputSearch from './components/input-search'
import Button from './components/button'

const breadcrumbOtp = ["Test management", "Candidate"]
export default function TestPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [breadCrumbActive, setBreadCrumbActive] = useState<string>(breadcrumbOtp[0]);

  return (
    <Fragment>
      <div className="bg-neutral-text-primary h-[270px]">
        <div className="container mx-auto pt-4">
          {/** HEADER */}
          <div className="flex items-center justify-between">
            <Image width={74.78} height={24} src='/images/logo/logo.svg' alt="logo" />
            <div>
              <BreadCrumb
                options={breadcrumbOtp}
                onActive={(item) => setBreadCrumbActive(item)}
                active={breadCrumbActive}
              />
            </div>
            <div className="flex items-center">
              <div className="relative cursor-pointer w-fit" onClick={() => alert("Notification Click.")}>
                <RenderIcon name="notification" className="text-white" />
                <span className="absolute top-0 right-[1px] bottom-0 w-2 h-2 bg-error-base border-[2px] border-solid border-neutral-text-secondary rounded-full"></span>
              </div>
              <span className="block w-4 border-[1px] border-solid border-neutral-placeholder rotate-90 mx-4"></span>
              <AvatarDropdown />
            </div>
          </div>

          {/** SEARCH BOX & ADD BUTTON */}
          <div className="flex items-center justify-between mt-8">
            <p className="uppercase font-bold text-24 leading-8 text-neutral-white">TEST MANAGEMENT</p>
            <div className="flex items-center">
              <InputSearch
                onSearch={(value) => alert(`Search:${value}`)}
                className="w-[448px] mr-6"
              />
              <Button
                label="CREATE TEST"
                onClick={() => alert("Create test")}
                icon={<RenderIcon name="plus" />}
              />
            </div>
          </div>
        </div>
      </div>

      <Fragment>
        {children}
      </Fragment>
    </Fragment>
  )
}
