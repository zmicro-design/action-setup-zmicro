"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.install = exports.getActionInput = void 0;
const core = require("@actions/core");
const execa_1 = require("@znode/execa");
execa_1.$.verbose = true;
function getActionInput() {
    const version = core.getInput('url');
    return {
        version,
    };
}
exports.getActionInput = getActionInput;
async function install(_version) {
    const platform = await execa_1.$ `uname -s`;
    switch (platform) {
        case 'Darwin':
            await execa_1.$ `brew update`;
            await execa_1.$ `brew install curl`;
            break;
        case 'Linux':
            await execa_1.$ `sudo apt update -y`;
            await execa_1.$ `sudo apt install -y curl`;
            break;
        default:
            throw new Error(`unsupport platform: ${platform}`);
    }
    await execa_1.$ `curl -o- https://raw.githubusercontent.com/zcorky/zmicro/master/install | bash`;
    await execa_1.$ `zmicro info`;
    await execa_1.$ `zmicro -v`;
}
exports.install = install;
async function action() {
    const actionInput = getActionInput();
    await install(actionInput.version);
}
exports.action = action;
action().catch((error) => {
    core.setFailed(error.message);
});
