import { getService } from '@strapi/plugin-users-permissions/server/utils';
import * as Strapi from '@strapi/strapi';
import utils from '@strapi/utils';
import { omit, pick, get } from 'lodash';

const { ApplicationError, ValidationError } = utils.errors;
const { sanitize } = utils;

type RegisterInput = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  provider: string;
};

type LoginInput = {
  email?: string;
  password?: string;
  provider: string;
};

const sanitizeUser = (user, ctx) => {
  const { auth } = ctx.state;
  const userSchema = strapi.getModel('plugin::users-permissions.user');

  return sanitize.contentAPI.output(user, userSchema, { auth });
};

const validateRegisterBody = async (params: RegisterInput, settings: any) => {
  if (!settings.allow_register) {
    throw new ApplicationError('Register action is currently disabled');
  }
  const { email, password, confirmPassword, username, provider } = params;
  const regexEmail = new RegExp('^[A-Za-z0-9._%+-]+@xpon.ai$');
  const regexPassword = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$'
  );
  if (!regexEmail.test(email)) {
    throw new ValidationError('Only email Xpon allowed');
  }
  if (!regexPassword.test(password)) {
    console.log({ password });
    throw new ValidationError(
      'Password must to have at least 7 characters, 1 number, 1 uppercase letter, 1 lowercase letter, one special character'
    );
  }
  if (password !== confirmPassword) {
    throw new ValidationError('Needing to match with the Password field');
  }
  const identifierFilter = {
    $or: [
      { email: email.toLowerCase() },
      { username: email.toLowerCase() },
      { username },
      { email: username },
    ],
  };
  const conflictingUserCount = await strapi
    .query('plugin::users-permissions.user')
    .count({
      where: { ...identifierFilter, provider },
    });

  if (conflictingUserCount > 0) {
    throw new ApplicationError('Email taken - please enter another email');
  }

  if (settings.unique_email) {
    const conflictingUserCount = await strapi
      .query('plugin::users-permissions.user')
      .count({
        where: { ...identifierFilter },
      });

    if (conflictingUserCount > 0) {
      throw new ApplicationError('Email taken - please enter another email');
    }
  }
  const role = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: settings.default_role } });

  if (!role) {
    throw new ApplicationError('Impossible to find the default role');
  }

  return role;
};

const validateLoginBody = async (params: LoginInput) => {
  const { email, password } = params;
  const regexEmail = new RegExp('^[A-Za-z0-9._%+-]+@xpon.ai$');

  if (!regexEmail.test(email)) {
    throw new ValidationError('Email is invalid');
  }

  if (!password) {
    throw new ValidationError('Password is required');
  }
};

export const register = async (ctx) => {
  const pluginStore = await strapi.store({
    type: 'plugin',
    name: 'users-permissions',
  });
  const settings = await pluginStore.get({ key: 'advanced' });

  const params: RegisterInput = {
    ...omit(ctx.request.body, [
      'confirmed',
      'blocked',
      'confirmationToken',
      'resetPasswordToken',
      'provider',
    ]),
    provider: 'local',
  };

  const role = await validateRegisterBody(params, settings);

  const { email, username } = params;

  const newUser = {
    ...params,
    role: role.id,
    email: email.toLowerCase(),
    username,
    confirmed: !settings.email_confirmation,
  };

  const user = await getService('user').add(newUser);

  const sanitizedUser = await sanitizeUser(user, ctx);

  if (settings.email_confirmation) {
    try {
      await getService('user').sendConfirmationEmail(sanitizedUser);
    } catch (err) {
      throw new ApplicationError(err.message);
    }

    return ctx.send({ user: sanitizedUser });
  }

  const jwt = getService('jwt').issue(pick(user, ['id']));

  return ctx.send({
    jwt,
    user: sanitizedUser,
  });
};

export const authenticate = async (ctx) => {
  const provider = ctx.params.provider || 'local';
  const params = ctx.request.body;

  const store = strapi.store({ type: 'plugin', name: 'users-permissions' });
  const grantSettings = await store.get({ key: 'grant' });

  const grantProvider = provider === 'local' ? 'email' : provider;

  if (!get(grantSettings, [grantProvider, 'enabled'])) {
    throw new ApplicationError('This provider is disabled');
  }

  if (provider === 'local') {
    await validateLoginBody(params);

    const { email } = params;

    // Check if the user exists.
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: {
        provider,
        $or: [{ email: email.toLowerCase() }, { username: email }],
      },
    });

    if (!user) {
      throw new ValidationError(
        'The email address provided is not registered. Please contact your Administrator.'
      );
    }

    const validPassword = await getService('user').validatePassword(
      params.password,
      user.password
    );

    if (!validPassword) {
      throw new ValidationError('Incorrect password');
    }

    const advancedSettings = await store.get({ key: 'advanced' });
    const requiresConfirmation = get(advancedSettings, 'email_confirmation');

    if (requiresConfirmation && user.confirmed !== true) {
      throw new ApplicationError('Your account email is not confirmed');
    }

    if (user.blocked === true) {
      throw new ApplicationError(
        'Your account has been blocked by an administrator'
      );
    }

    return ctx.send({
      jwt: getService('jwt').issue({ id: user.id }),
      user: await sanitizeUser(user, ctx),
    });
  }

  // Connect the user with the third-party provider.
  try {
    const user = await getService('providers').connect(provider, ctx.query);

    return ctx.send({
      jwt: getService('jwt').issue({ id: user.id }),
      user: await sanitizeUser(user, ctx),
    });
  } catch (error) {
    throw new ApplicationError(error.message);
  }
};
