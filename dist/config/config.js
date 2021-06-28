"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdk = void 0;
const backend_sdk_1 = __importDefault(require("@epnsproject/backend-sdk"));
const EPNS_ABI = __importStar(require("./ABIs"));
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
    contractABI: EPNS_ABI.toString()
};
// NB: Either one or both alchemy and infura has to be passed in to the sdk settings
exports.sdk = new backend_sdk_1.default('ropsten', process.env.STREAM_PRIVATE_KEY, settings, epnsSettings);
//# sourceMappingURL=config.js.map