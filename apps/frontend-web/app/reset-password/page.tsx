'use client';
import React from 'react';
import { UiModuleLayoutAuth } from '@test-assessment/ui-module-layout-auth';
import { Input, Button } from '@test-assessment/ui-components';

export default function Home() {
  return (
    <UiModuleLayoutAuth>
      <h2 className="font-bold text-40">Reset password</h2>
      <p className="text-15">Please create a new password.</p>
      <div className="mt-20">
        <Input
          label="Password"
          placeholder="Enter your password"
          className="w-full"
          type="password"
        ></Input>
        <Input
          label="Confirm password"
          placeholder="Re-enter your password"
          className="w-full font-normal"
          type="password"
        ></Input>
        <Button
          className="mt-12 w-full uppercase"
          onClick={() => console.log('submit')}
          type="button"
        >
          CONFIRM
        </Button>
      </div>
    </UiModuleLayoutAuth>
  );
}
