const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { AlchemyProvider } = require("@ethersproject/providers");
const { Wallet } = require("@ethersproject/wallet");
const { Contract } = require("@ethersproject/contracts");
const { networkSecrets, accountSecrets } = require('./config/config');
const { getChannelSubscribers } = require("./epns");
const { BigNumber } = require('@ethersproject/bignumber');

import { lowBalanceWarning } from "./epns";

const provider = new AlchemyProvider("ropsten", networkSecrets.alchemyKey);
const signer = new Wallet(accountSecrets.privateKey, provider);
const sf = new SuperfluidSDK.Framework({
    ethers: provider,
    tokens: ["ETHx"]
});
export const initSF = async () => { 
    await sf.initialize();
    superfluidMain();
}

const superfluidMain = async () => {
    var subscribers: string[] = await getChannelSubscribers();
    checkForLowBalances(subscribers);
}

var lowBalanceNotifSentMap = new Map();

const checkForLowBalances = async (subscribers: string[]) => {
    subscribers.forEach(async (address) => {
        // initialises superfluid user object
        let user = sf.user({ address: address, token: sf.tokens.ETHx.address });
        try {
            // returns account details of user
            var details = await user.details();
            let netFlow = details.cfa.netFlow;

            // if users outgoing > incoming
            if (netFlow < 0) {
                const ethxContract = new Contract(sf.tokens.ETHx.address, sf.contracts.ISuperToken.abi, signer);
                var balance = await ethxContract.realtimeBalanceOfNow(address);
                var available = balance.availableBalance;
                var bigNumberNetFlow = BigNumber.from(netFlow * -1);

                let timeRemaining = available.div(bigNumberNetFlow);
                let daysRemaining = (((timeRemaining / 60) / 60) / 24);

                if (daysRemaining < 5) {
                    var date = new Date();
                    var now = date.getTime();
                    if (lowBalanceNotifSentMap.has(address)) {
                        var sentTime = lowBalanceNotifSentMap.get(address);
                        const msPerDay = 86400000;
                        if (now - sentTime > msPerDay) {
                            lowBalanceNotifSentMap.set(address, now);
                            lowBalanceWarning(address, 'ETHx', daysRemaining.toFixed(2));
                        } else {
                            console.log(`low bal for ${address} - notif already sent`);
                        }
                    } else {
                        lowBalanceNotifSentMap.set(address, now);
                        lowBalanceWarning(address, 'ETHx', daysRemaining.toString());
                    }
                }
            }
        } catch (e) {
            console.error(e);
        }
    })
    // check for new subs every min
    setTimeout(superfluidMain, 60000);
}
