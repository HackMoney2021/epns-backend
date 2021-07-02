"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkSecrets = exports.accountSecrets = exports.sdk = exports.infuraSettings = void 0;
const backend_sdk_1 = __importDefault(require("@epnsproject/backend-sdk"));
const ABIs_1 = require("./ABIs");
// InfuraSettings contains setttings details on infura
exports.infuraSettings = {
    projectID: process.env.INFURA_ID,
    projectSecret: process.env.INFURA_SECRET
};
// Network settings contains details on alchemy, infura and etherscan
const settings = {
    infura: exports.infuraSettings,
    etherscan: process.env.ETHERSCAN_API_KEY
};
// EPNSSettings settings contains details on EPNS network, contract address and contract ABI
const epnsSettings = {
    network: 'ropsten',
    contractAddress: '0xc882dA9660d29c084345083922F8a9292E58787D',
    contractABI: ABIs_1.EPNS_ABI
};
// initialising and exporting sdk object
// params
// - network: currently only supports 'ropsten'
// - channel key: the private key of the address used to create the channel
// - settings: network settings (provider settings)
// - epnsSettings: epns's ropsten contract information
exports.sdk = new backend_sdk_1.default('ropsten', process.env.CHANNEL_PRIVATE_KEY, settings, epnsSettings);
exports.accountSecrets = {
    "compressedPublicKey": "",
    "publicKey": "",
    "curve": "",
    "privateKey": process.env.CHANNEL_PRIVATE_KEY,
    "address": "",
    "mnemonic": {
        "phrase": "",
        "path": ""
    }
};
exports.networkSecrets = {
    "productionHttp": "",
    "productionWss": "",
    "mainnetTestingHttp": "",
    "mainnetTestingWss": "",
    "ropstenHttp": "",
    "alchemyKey:": process.env.ALCHEMY_KEY,
    "infuraKey": ""
};
//# sourceMappingURL=config.js.map