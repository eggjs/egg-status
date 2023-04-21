# egg-status

egg application "Health Checker"

## Install

```bash
npm i egg-status
```

## Usage

Enable egg-status plugin on `config/plugin.ts`.

```ts
export default {
  status: {
    package: 'egg-status',
    enable: true,
  },
}
```

Use [egg-scripts](https://www.eggjs.org/core/deployment#start) deploy your egg application.

Firstly, we need to import `egg-scripts` as dependencies:

```bash
npm i egg-scripts
```

Then add npm scripts to package.json, create `egg.status` file after start and remove it before stop:

```json
{
  "scripts": {
    "start": "egg-scripts start --daemon && touch egg.status",
    "stop": "rm -f egg.status && sleep 15 && egg-scripts stop"
  }
}
```

Set "Health Check" on SLB, example on alicloud

![image](https://user-images.githubusercontent.com/156269/233519532-b502ebef-7b1a-4ff5-b0f0-40a0af1a365d.png)

## How to Contribute

Please let us know how can we help. Do check out [issues](https://github.com/eggjs/egg/issues) for bug reports or suggestions first.

To become a contributor, please follow our [contributing guide]([CONTRIBUTING.md](https://github.com/eggjs/egg/blob/master/CONTRIBUTING.md)).

## License

[MIT](LICENSE)
