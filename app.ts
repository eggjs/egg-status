import assert from 'node:assert';
import type { Application } from 'egg';

export default (app: Application) => {
  // insert after meta
  const index = app.config.coreMiddleware.indexOf('meta');
  assert(index >= 0, 'meta middleware not exists');
  app.config.coreMiddlewares.splice(index + 1, 0, 'status');
};
