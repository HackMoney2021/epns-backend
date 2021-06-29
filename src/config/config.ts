require("dotenv").config();
import epnsHelper, {InfuraSettings, NetWorkSettings, EPNSSettings} from '@epnsproject/backend-sdk';
import epnsABI from "../contracts/epnscore.json";


const config = {
  etherscanAPI: process.env.etherscanAPI, 
  web3RopstenNetwork: "ropsten",
  deployedContract: "0xc882dA9660d29c084345083922F8a9292E58787D",
  deployedContractABI: epnsABI.toString()
}

/*
        SETUP NEEDED HERE
*/

// InfuraSettings contains setttings details on infura
const infuraSettings: InfuraSettings = {
    projectID: process.env.INFURA_ID,
    projectSecret: process.env.INFURA_SECRET
}

// Network settings contains details on alchemy, infura and etherscan
const settings: NetWorkSettings = {
  infura: infuraSettings,
  //etherscan: config.etherscanAPI
}

// EPNSSettings settings contains details on EPNS network, contract address and contract ABI
const epnsSettings: EPNSSettings = {
  network: config.web3RopstenNetwork,
  contractAddress: config.deployedContract,
  contractABI: config.deployedContractABI
}

// NB: Either one or both alchemy and infura has to be passed in to the sdk settings
const sdk = new epnsHelper(config.web3RopstenNetwork, process.env.channelKey, settings, epnsSettings)

export {
  sdk
}
