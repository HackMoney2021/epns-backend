import epnsHelper, { InfuraSettings, NetWorkSettings, EPNSSettings } from '@epnsproject/backend-sdk';
import { EPNS_ABI } from "./ABIs";

// InfuraSettings contains setttings details on infura
const infuraSettings: InfuraSettings = {
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
  // contractAddress: '0xFec586DaebA99492971763EB1Dc0f80f7751baB5',
  contractABI: EPNS_ABI
  // contractABI: require("./epns_contract.json")
}

// NB: Either one or both alchemy and infura has to be passed in to the sdk settings
export const sdk = new epnsHelper('ropsten', process.env.STREAM_PRIVATE_KEY, settings, epnsSettings); 