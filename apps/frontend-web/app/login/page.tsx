'use client';
import React from 'react';

export default function page() {
  const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(123);
  };

  const test = () => {
    console.log(124324);
  };
  return (
    <div className="grid grid-flow-col auto-cols-max px-52">
      <div>
        <img src="/images/login_bg.jpg" alt="" className="h-auto max-w-full" />
      </div>
      <div className="p-24">
        <img src="/images/xpon_logo.png" alt="" className="mb-32" />
        <p className="text-40 font-bold text-neutral-text-secondary">Login</p>
        <p className="text-15 text-neutral-text-secondary mb-10">
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
                onKeyDown={handleKeyboardEvent}
                required
              />
              <span className="text-13 text-error-base">123123</span>
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
                required
              />
              <span className="text-13 text-error-base">123123</span>
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
  );
}
