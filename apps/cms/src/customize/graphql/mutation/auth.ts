import { toPlainObject } from 'lodash/fp';
import { register } from '../../controller/auth';
import { checkBadRequest } from '../common';

export const registerAuth = async (
  _: any,
  args: { input: any },
  context: { koaContext: any }
) => {
  const { koaContext } = context;

  koaContext.request.body = toPlainObject(args.input);

  await register(koaContext);

  const output = koaContext.body;

  checkBadRequest(output);

  return {
    user: output.user || output,
    jwt: output.jwt,
  };
};
