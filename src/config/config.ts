import epnsHelper, {InfuraSettings, NetWorkSettings, EPNSSettings} from '@epnsproject/backend-sdk'

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
    alchemy: process.env.ALCHEMY_API,
    infura: infuraSettings,
    etherscan: config.etherscanAPI
  }
  
  // EPNSSettings settings contains details on EPNS network, contract address and contract ABI
  const epnsSettings: EPNSSettings = {
    network: config.web3RopstenNetwork,
    contractAddress: config.deployedContract,
    contractABI: config.deployedContractABI
  }
  
  // NB: Either one or both alchemy and infura has to be passed in to the sdk settings
  const sdk = new epnsHelper(config.web3MainnetNetwork, channelKey, settings)