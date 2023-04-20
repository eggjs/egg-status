import fs from 'node:fs/promises';
import type { Application, Context } from 'egg';

type StatusOptions = {
  availableResponseKeyword: string;
  unavailableResponseKeyword: string;
  unavailableResponseStatus: number;
  checkStatusURLs: string[];
  checkStatusFiles: string[];
};

async function existsFile(filepath: string) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

export default (options: StatusOptions, app: Application) => {
  const availableResponseKeyword = options.availableResponseKeyword;
  const unavailableResponseKeyword = options.unavailableResponseKeyword;
  const unavailableResponseStatus = options.unavailableResponseStatus;
  const checkStatusURLs = options.checkStatusURLs;
  const checkStatusFiles = options.checkStatusFiles;
  const starttime = Date();

  return async function serverStatus(ctx: Context, next) {
    if (!checkStatusURLs.includes(ctx.path)) {
      return next();
    }

    let exists = false;
    let status = 200;
    for (const statusFile of checkStatusFiles) {
      if (await existsFile(statusFile)) {
        exists = true;
        break;
      }
    }
    let body = app.name + ` (${starttime} ~ ${Date()}), status: `;
    if (exists) {
      body += availableResponseKeyword;
    } else {
      body += unavailableResponseKeyword;
      status = unavailableResponseStatus;
    }
    ctx.status = status;
    ctx.body = body;
  };
};
