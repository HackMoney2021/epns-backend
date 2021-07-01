"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdk = void 0;
const backend_sdk_1 = __importDefault(require("@epnsproject/backend-sdk"));
const ABIs_1 = require("./ABIs");
// InfuraSettings contains setttings details on infura
const infuraSettings = {
    projectID: process.env.INFURA_ID,
    projectSecret: process.env.INFURA_SECRET
};
// Network settings contains details on alchemy, infura and etherscan
const settings = {
    infura: infuraSettings,
    etherscan: process.env.ETHERSCAN_API_KEY
};
// EPNSSettings settings contains details on EPNS network, contract address and contract ABI
const epnsSettings = {
    network: 'ropsten',
    contractAddress: '0xc882dA9660d29c084345083922F8a9292E58787D',
    // contractAddress: '0xFec586DaebA99492971763EB1Dc0f80f7751baB5',
    contractABI: ABIs_1.EPNS_ABI
    // contractABI: require("./epns_contract.json")
};
// NB: Either one or both alchemy and infura has to be passed in to the sdk settings
exports.sdk = new backend_sdk_1.default('ropsten', process.env.STREAM_PRIVATE_KEY, settings, epnsSettings);
//# sourceMappingURL=config.js.map