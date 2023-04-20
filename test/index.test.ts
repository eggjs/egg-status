import assert from 'node:assert';
import path from 'node:path';
import fs from 'node:fs/promises';
import mock from 'egg-mock';

describe('test/index.test.ts', () => {
  const app = mock.app({
    baseDir: 'demo',
  });
  before(async () => {
    await app.ready();
    try {
      await fs.unlink(path.join(app.baseDir, 'egg.status'));
    } catch {
      // ignore
    }
  });
  after(async () => {
    await app.close();
  });

  it('should 404 when status not ready', async () => {
    const res = await app.httpRequest()
      .get('/egg.status');
    assert.equal(res.status, 404);
    assert.match(res.text, /, status: offline/);
  });

  it('should 200 when status ready', async () => {
    await fs.writeFile(path.join(app.baseDir, 'egg.status'), 'hi');
    const res = await app.httpRequest()
      .get('/egg.status');
    assert.equal(res.status, 200);
    assert.match(res.text, /, status: online/);
    await fs.unlink(path.join(app.baseDir, 'egg.status'));
  });
});
