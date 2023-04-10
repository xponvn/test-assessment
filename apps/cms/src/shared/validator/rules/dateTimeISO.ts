const dateTimeISO = (
  value: string | number | boolean,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void
) => {
  try {
    const newValue = String(value);
    const date = new Date(newValue);
    if (String(date) !== 'Invalid Date' && newValue === date.toISOString()) {
      return passes();
    }
    return passes(false);
  } catch (error) {
    strapi.log.error('[Validate] dateTimeISO', error);
  }
};

export default dateTimeISO;
