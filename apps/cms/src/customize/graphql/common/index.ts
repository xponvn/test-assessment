import { getOr } from 'lodash/fp';

export const checkBadRequest = (contextBody: any) => {
  const statusCode = getOr(200, 'statusCode', contextBody);

  if (statusCode !== 200) {
    const errorMessage = getOr('Bad Request', 'error', contextBody);

    const exception: any = new Error(errorMessage);

    exception.code = statusCode || 400;
    exception.data = contextBody;

    throw exception;
  }
};
