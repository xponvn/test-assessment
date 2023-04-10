import { logger, registerValidate } from './middlewares';

export default (plugin) => {
  const routes = plugin.routes['content-api'].routes;
  const registerRoute = routes.find((r) => r.handler === 'auth.register');
  registerRoute.config.middlewares.push(logger, registerValidate);
  return plugin;
};
