import React from 'react';
import { UiModuleLayoutAuth } from '@test-assessment/ui-module-layout-auth';
import { Input } from '@test-assessment/ui-components';

export default function Home() {
  return (
    <UiModuleLayoutAuth>
      <h2 className="font-bold text-40">Forgot Your Password?</h2>
      <p className="text-15">
        Please confirm your email address below then we will send you a
        verification code.
      </p>
      <form>
        <Input label="Email"></Input>
      </form>
    </UiModuleLayoutAuth>
  );
}
