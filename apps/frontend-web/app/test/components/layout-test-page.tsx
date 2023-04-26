"use client"
import Image from "next/image"
import { usePathname, useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import '../styles/style.css'
import AvatarDropdown from './avatar-dropdown'
import BreadCrumb from './breadcrumb'
import Button from "./button"
import InputSearch from "./input-search"
import { getTotalPoint, useQuestion } from "../add/utils"
import Link from "next/link"
import { Icon } from "@test-assessment/ui-components"

const breadcrumbOtp = ["Test management", "Candidate"]
export default function LayoutTestPage({
  children,
}: {
  children: React.ReactNode
}) {
  const [breadCrumbActive, setBreadCrumbActive] = useState<string>(breadcrumbOtp[0]);
  const pathname = usePathname();
  const isAdd = pathname.includes('add');
  const router = useRouter();
  const { questions } = useQuestion();

  const renderActions = () => {
    if (isAdd) {
      return <div className="flex items-center">
        <div className="mr-6 text-neutral-border text-15 leading-24">Total point: <span className="font-bold text-neutral-white">{getTotalPoint(questions)}</span></div>
        <span className="border border-solid w-6 h-0 rotate-90 border-neutral-placeholder mr-6"></span>
        <label htmlFor="btn-test-info" className="outline-none text-13 leading-20 font-bold py-[10px] px-5 uppercase text-neutral-white border-primary-base border border-solid hover:bg-primary-base hover:text-neutral-text-primary transition-all mr-2 cursor-pointer flex items-center">
          SAVE AS DRAFT
          <Icon name="save" className="text-neutral-white ml-2" />
        </label>
        <Button
          label="PUBLISH"
          style="style_2"
          onClick={() => alert("Publish Test")}
          icon={<Icon name="publish" className="text-neutral-text-primary ml-2" />}
        />
      </div>
    }
    return <div className="flex items-center">
      <InputSearch
        onSearch={(value) => alert("asdasd")}
        className="w-[448px] mr-6"
      />
      <Button
        label="CREATE TEST"
        style="style_2"
        onClick={() => router.push('/test/add')}
        icon={<Icon name="plus" />}
      />
    </div>
  };
  return (
    <Fragment>
      <div className="bg-neutral-text-primary h-[270px]">
        <div className="container mx-auto pt-4">
          {/** HEADER */}
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image width={74.78} height={24} src='/images/logo/logo.svg' alt="logo" />
            </Link>
            <div>
              <BreadCrumb
                options={breadcrumbOtp}
                onActive={(item) => setBreadCrumbActive(item)}
                active={breadCrumbActive}
              />
            </div>
            <div className="flex items-center">
              <div className="relative cursor-pointer w-fit" onClick={() => alert("Notification Click.")}>
                <Icon name="notification" className="text-white" />
                <span className="absolute top-0 right-[1px] bottom-0 w-2 h-2 bg-error-base border-[2px] border-solid border-neutral-text-secondary rounded-full"></span>
              </div>
              <span className="block w-4 border-[1px] border-solid border-neutral-placeholder rotate-90 mx-4"></span>
              <AvatarDropdown />
            </div>
          </div>

          {/** ACTION */}
          <div className="flex items-center justify-between mt-8">
            <p className="uppercase font-bold text-24 leading-8 text-neutral-white">{isAdd ? 'CREATE TEST' : 'TEST MANAGEMENT'}</p>
            {renderActions()}
          </div>
        </div>
      </div>

      <Fragment>
        {children}
      </Fragment>
    </Fragment>
  )
}
