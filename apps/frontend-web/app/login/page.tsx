/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Input, Button, Icon } from '@test-assessment/ui-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const regexEmail = new RegExp('^[A-Za-z0-9._%+-]+@xpon.ai$');
const regexPassword = new RegExp(
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$'
);
type LoginForm = {
  email: string;
  password: string;
};
export default function Page() {
  const schema = yup
    .object({
      email: yup
        .string()
        .required('Please enter an email address')
        .matches(regexEmail, 'Please enter an email address'),
      password: yup
        .string()
        .required('Incorrect password')
        .matches(regexPassword, 'Incorrect password'),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
    // Request API
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid mb-6 md:grid-cols-1">
                <div>
                  <Input
                    label="Email"
                    type="text"
                    placeholder="Enter your email"
                    block
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
              </div>
              <div className="grid mb-6 md:grid-cols-1">
                <div>
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register('password')}
                    error={errors.password?.message}
                    block
                  />
                </div>
              </div>
              <div className="grid mb-6 md:grid-cols-1">
                <Button
                  type="button"
                  className="text-neutral-text-primary font-medium px-5 py-2.5 text-center bg-primary-base"
                  onClick={() => handleSubmit(onSubmit)}
                >
                  LOGIN
                </Button>
              </div>
              <div className="grid mb-6 md:grid-cols-1 text-center">
                <Button
                  type="link"
                  href="/forgot-password"
                  title="Forgot your password"
                  RightIcon={() => (
                    <Icon
                      name="arrowRight"
                      width={24}
                      height={24}
                      color="text-primary-placeholder"
                    />
                  )}
                >
                  Forgot your password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
