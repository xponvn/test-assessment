import { DefaultContext, DefaultState, Next, ParameterizedContext } from 'koa';
import Validator from 'validatorjs';
import dateTimeISO from './rules/dateTimeISO';

Validator.registerAsync('dateTimeISO', dateTimeISO, 'dateTimeISO');

export type ValidationConfig = {
  data: Record<string, unknown>;
  rules: {
    [key: string]: string;
  };
  attributes?: {
    [key: string]: string;
  };
  messages?: {
    [key: string]: string;
  };
  message?: string;
};

import { Middleware } from '@strapi/strapi/lib/middlewares';

export const createValidatorMiddleware = (
  context: ParameterizedContext<DefaultState, DefaultContext, any>,
  next: Next,
  config: ValidationConfig
): Middleware => {
  const validator = new Validator(config.data, config.rules, {
    ...(config.messages || {}),
  });

  validator.setAttributeFormatter((attribute: string) => {
    const newAttribute = attribute
      .split('.')
      .filter((x) => isNaN(parseInt(x)))
      .join('.');

    return config?.attributes?.[newAttribute] || attribute;
  });

  const passes = () => next();

  const fails = () => {
    return context.badRequest('InputValid', validator.errors.errors);
  };

  return validator.checkAsync(passes, fails);
};
