import * as core from '@actions/core';
import { api } from '@cliz/cli';

api.$.verbose = true;

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
  await api.$`apt update -y`;

  await api.$`apt install -y curl`;

  await api.$`curl -o- https://raw.githubusercontent.com/zcorky/zmicro/master/install | bash`;

  await api.$`zmicro info`;

  await api.$`zmicro -v`;
}

export async function action() {
  const actionInput = getActionInput();

  await install(actionInput.version);
}

action().catch((error) => {
  core.setFailed(error.message);
});
