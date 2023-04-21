import React from 'react';
import { Logo, LogoBg } from '../images';
import Image from 'next/image';

/* eslint-disable-next-line */
export interface UiModuleLayoutAuthProps {
  children?: React.ReactNode;
}

export function UiModuleLayoutAuth({ children }: UiModuleLayoutAuthProps) {
  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="w-full md:w-1/2 xl:w-4/7 h-screen">
        <Image className="object-cover w-full h-full" src={LogoBg} alt="img" />
      </div>
      <div className="w-full md:w-1/2 xl:w-4/7 h-screen">
        <div className="p-24 w-3/7">
          <Image src={Logo} alt="" className="mb-32" />
          {children}
        </div>
      </div>
    </div>
  );
}

export default UiModuleLayoutAuth;
