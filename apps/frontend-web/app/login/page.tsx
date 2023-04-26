/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Input, Button, Icon } from '@test-assessment/ui-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UiModuleLayoutAuth } from '@test-assessment/ui-module-layout-auth';
import { useApiClient } from '@test-assessment/cms-graphql-api';
import { useAuth } from '@test-assessment/ui-auth-protect';
import { useRouter } from 'next/navigation';

const regexEmail = new RegExp('^[A-Za-z0-9._%+-]+@xpon.ai$');
const regexPassword = new RegExp(
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$'
);
type LoginForm = {
  email: string;
  password: string;
};

export default function Page() {
  const { apiClient } = useApiClient();
  const { storeUser, user } = useAuth();
  const router = useRouter();

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

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await apiClient.login({
        input: {
          email: data.email,
          password: data.password,
          provider: 'local',
        },
      });
      if (result.login) {
        storeUser({
          token: result?.login.jwt,
          user: {
            id: result?.login.user?.id,
            email: result?.login.user?.email,
          },
        });
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  return (
    <UiModuleLayoutAuth>
      <p className="text-40 font-bold text-neutral-text-secondary">Login</p>
      <p className="text-15 font-normal text-neutral-text-secondary mb-10">
        Please sign in with your provided account and password
      </p>
      <form>
        <div className="grid mb-6 md:grid-cols-2">
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
        <div className="grid mb-6 md:grid-cols-2">
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
        <div className="grid mb-6 md:grid-cols-2">
          <Button
            type="button"
            className="text-neutral-text-primary font-medium px-5 py-2.5 text-center bg-primary-base"
            onClick={handleSubmit(onSubmit)}
          >
            LOGIN
          </Button>
        </div>
        <div className="grid mb-6 md:grid-cols-2 text-center">
          <Button
            type="link"
            href="/forgot-password"
            title="Forgot your password"
            RightIcon={
              <Icon
                name="arrowRight"
                width={24}
                height={24}
                color="text-primary-placeholder"
              />
            }
          >
            Forgot your password
          </Button>
        </div>
      </form>
    </UiModuleLayoutAuth>
  );
}
