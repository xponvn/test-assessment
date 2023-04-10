import { Middleware } from '@strapi/strapi/lib/middlewares';
import { createValidatorMiddleware } from '../../../shared/validator';

export const logger: Middleware = (ctx, next) => {
  const data = ctx.request.body as any;
  console.log(ctx.URL, data);
  return next();
};

export const registerValidate: Middleware = (ctx, next) => {
  const data = ctx.request.body as any;
  return createValidatorMiddleware(ctx, next, {
    data,
    rules: {
      password: 'min:20',
    },
  });
};
