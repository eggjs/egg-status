import path from 'node:path';
import type { EggAppInfo } from 'egg';

export default (appInfo: EggAppInfo) => {
  return {
    /**
     * status middleware options
     * @member Config#status
     * @property {string} availableResponseKeyword - service available response keyword, default is `online`
     * @property {string} unavailableResponseKeyword - service unavailable response keyword, default is `offline`
     * @property {number} unavailableResponseStatus - service unavailable response status, default is `404`
     * @property {Array} checkStatusURLs - service status check urls, default is `['/egg.status']`
     * @property {Array} checkStatusFiles - default is `['${baseDir}/egg.status']`
     */
    status: {
      availableResponseKeyword: 'online',
      unavailableResponseKeyword: 'offline',
      unavailableResponseStatus: 404,
      checkStatusURLs: [ '/egg.status' ],
      checkStatusFiles: [ path.join(appInfo.baseDir, 'egg.status') ],
    },
  };
};
