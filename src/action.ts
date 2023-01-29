import * as core from '@actions/core';
import { $ } from '@znode/execa';

$.verbose = true;

export interface IActionInput {
  version?: string;
}

export function getActionInput(): IActionInput {
  const version: string = core.getInput('url');

  return {
    version,
  };
}

export async function install(_version?: string) {
  const platform = await $`uname -s`;
  switch (platform) {
    case 'Darwin':
      await $`brew update`;
      await $`brew install -y curl`;
      break;
    case 'Linux':
      await $`sudo apt update -y`;
      await $`sudo apt install -y curl`;
      break;
    default:
      throw new Error(`unsupport platform: ${platform}`);
  }

  await $`curl -o- https://raw.githubusercontent.com/zcorky/zmicro/master/install | bash`;

  await $`zmicro info`;

  await $`zmicro -v`;
}

export async function action() {
  const actionInput = getActionInput();

  await install(actionInput.version);
}

action().catch((error) => {
  core.setFailed(error.message);
});
