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
      core.startGroup(`Download curl with brew ...`);
      await $`brew update`;
      await $`brew install curl`;
      core.endGroup();
      break;
    case 'Linux':
      core.startGroup(`Download curl with apt ...`);
      await $`sudo apt update -y`;
      await $`sudo apt install -y curl`;
      core.endGroup();
      break;
    default:
      throw new Error(`unsupport platform: ${platform}`);
  }

  core.startGroup(`Install zmicro ...`);
  await $`curl -o- https://raw.githubusercontent.com/zcorky/zmicro/master/install | bash`;
  core.endGroup();

  core.startGroup(`Show zmicro info and version ...`);
  await $`zmicro info`;
  await $`zmicro -v`;
  core.endGroup();
}

export async function action() {
  const actionInput = getActionInput();

  await install(actionInput.version);
}

action().catch((error) => {
  core.setFailed(error.message);
});
