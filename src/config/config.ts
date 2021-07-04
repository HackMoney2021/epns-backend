import epnsHelper, { InfuraSettings, NetWorkSettings, EPNSSettings } from '@epnsproject/backend-sdk';
import { EPNS_ABI } from "./ABIs";

// InfuraSettings contains setttings details on infura
export const infuraSettings: InfuraSettings = {
  projectID: process.env.INFURA_ID,
  projectSecret: process.env.INFURA_SECRET
}

// Network settings contains details on alchemy, infura and etherscan
const settings: NetWorkSettings = {
  infura: infuraSettings,
  etherscan: process.env.ETHERSCAN_API_KEY
}

// EPNSSettings settings contains details on EPNS network, contract address and contract ABI
const epnsSettings: EPNSSettings = {
  network: 'ropsten',
  contractAddress: '0xc882dA9660d29c084345083922F8a9292E58787D',
  contractABI: EPNS_ABI
}

// initialising and exporting sdk object
// params
// - network: currently only supports 'ropsten'
// - channel key: the private key of the address used to create the channel
// - settings: network settings (provider settings)
// - epnsSettings: epns's ropsten contract information
export const sdk = new epnsHelper('ropsten', process.env.CHANNEL_PRIVATE_KEY, settings, epnsSettings); 

export const accountSecrets = {
  "compressedPublicKey" : "",
  "publicKey": "",
  "curve": "",
  "privateKey" : process.env.CHANNEL_PRIVATE_KEY,
  "address" : "",
  "mnemonic": {
      "phrase": "",
      "path": ""
  }
}

export const networkSecrets = {
  "productionHttp" : "",
  "productionWss" : "",
  "mainnetTestingHttp":"",
  "mainnetTestingWss": "",
  "ropstenHttp":"",
  "alchemyKey:": process.env.ALCHEMY_KEY,
  "infuraKey": ""
}