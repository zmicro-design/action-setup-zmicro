"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action = exports.install = exports.getActionInput = void 0;
const core = require("@actions/core");
const cli_1 = require("@cliz/cli");
cli_1.api.$.verbose = true;
function getActionInput() {
    const version = core.getInput('url');
    return {
        version,
    };
}
exports.getActionInput = getActionInput;
async function install(_version) {
    await cli_1.api.$ `apt update -y`;
    await cli_1.api.$ `apt install -y curl`;
    await cli_1.api.$ `curl -o- https://raw.githubusercontent.com/zcorky/zmicro/master/install | bash`;
    await cli_1.api.$ `zmicro info`;
    await cli_1.api.$ `zmicro -v`;
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
