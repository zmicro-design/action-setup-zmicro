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
    await execa_1.$ `apt update -y`;
    await execa_1.$ `apt install -y curl`;
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
