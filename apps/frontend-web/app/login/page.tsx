'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Page() {
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const regexEmail = new RegExp('^[A-Za-z0-9._%+-]+@xpon.ai$');
  const regexPassword = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$'
  );

  const handleEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!regexEmail.test('123')) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
  };

  const handlePassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!regexPassword.test('123')) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen items-center">
      <div className="w-full md:w-1/2 xl:w-4/7 h-screen">
        <img
          className="object-cover w-full h-full"
          src="/images/login_bg.jpg"
          alt="img"
        />
      </div>
      <div className="w-full md:w-1/2 xl:w-4/7 h-screen">
        <div className="flex p-24 w-3/7">
          <div>
            <img src="/images/xpon_logo.png" alt="" className="mb-32" />
            <p className="text-40 font-bold text-neutral-text-secondary">
              Login
            </p>
            <p className="text-15 font-normal text-neutral-text-secondary mb-10">
              Please sign in with your provided account and password
            </p>
            <form>
              <div className="grid mb-6 md:grid-cols-1">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-neutral-placeholder text-13 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-neutral-border block w-full p-2.5 placeholder-neutral-border text-15 mb-2"
                    placeholder="Enter your email"
                    onKeyDown={handleEmail}
                    required
                  />
                  <span className="text-13 text-error-base">
                    {isEmailError && 'Please enter an email address'}
                  </span>
                </div>
              </div>
              <div className="grid mb-6 md:grid-cols-1">
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-neutral-placeholder text-13 font-medium"
                  >
                    Password
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-neutral-border block w-full p-2.5 placeholder-neutral-border text-15  mb-2"
                    placeholder="Enter your password"
                    onKeyDown={handlePassword}
                    required
                  />
                  <span className="text-13 text-error-base">
                    {isPasswordError && 'Incorrect password'}
                  </span>
                </div>
              </div>
              <div className="grid mb-6 md:grid-cols-1">
                <button
                  type="button"
                  className="text-neutral-text-primary font-medium px-5 py-2.5 text-center bg-primary-base"
                  onClick={() => {
                    console.log(123);
                  }}
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
