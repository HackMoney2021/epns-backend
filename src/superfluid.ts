const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { AlchemyProvider } = require("@ethersproject/providers");
const { Wallet } = require("@ethersproject/wallet");
const { networkSecrets, accountSecrets } = require('./config/config');
const { getChannelSubscribers } = require("./epns");
const { BigNumber } = require('@ethersproject/bignumber');

import { lowBalanceWarning } from "./epns";

const provider = new AlchemyProvider("ropsten", networkSecrets.alchemyKey);

const supportedTokens = ["ETHx"];

const sf = new SuperfluidSDK.Framework({
    ethers: provider,
    tokens: supportedTokens
});

export const initSF = async () => { 
    await sf.initialize();
    superfluidMain();
}

const superfluidMain = async () => {
    var subscribers: string[] = await getChannelSubscribers();
    checkForLowBalances(subscribers);
}

const msPerDay = 86400000;
const msPerMin = 60000;

var notificationMap = new Map();

const checkForLowBalances = async (subscribers: string[]) => {
    subscribers.forEach(async (address) => {
        supportedTokens.forEach(async (token: string) => {
            // initialises superfluid user object with specific token
            let user = sf.user({ address: address, token: sf.tokens[token].address });
            try {
                // returns account details of user
                var details = await user.details();
                let netFlow = details.cfa.netFlow;

                // if users outgoing > incoming
                if (netFlow < 0) {
                    var balance = await sf.tokens[token].realtimeBalanceOfNow(address);
                    var available = balance.availableBalance;
                    var bigNumberNetFlow = BigNumber.from(netFlow * -1);

                    let timeRemaining = available.div(bigNumberNetFlow);
                    let daysRemaining = (((timeRemaining / 60) / 60) / 24);

                    if (daysRemaining < 5) {
                        var date = new Date();
                        var now = date.getTime();
                        // need to check if we've already notified (currently once per day)
                        if (notificationMap.has(address)) {
                            let tokenMap = notificationMap.get(address);
                            var sentTime = tokenMap.get(token);
                            if (now - sentTime > msPerDay) {
                                tokenMap.set(token, now);
                                notificationMap.set(address, tokenMap);
                                lowBalanceWarning(address, token, daysRemaining);
                            } //else {
                                // console.log(`low bal for ${address} - notif already sent`);
                            // }
                        } else {
                            let tokenMap = new Map();
                            tokenMap.set(token, now);
                            notificationMap.set(address, tokenMap);
                            lowBalanceWarning(address, token, daysRemaining);
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            }
        })
    })
    // check for new subs every min
    setTimeout(superfluidMain, 0.2 * msPerMin);
}

const checkForUpdatedStream = async (subscribers: string[]) => {
    // Filters events on ConstantFlowAgreement contract for FlowUpdated() events in last few blocks

    let filter = sf.agreements.cfa.filters.FlowUpdated() 

    // Set block range 
    filter.fromBlock = provider.getBlockNumber().then((b:number) => b - 10000); // To do: replace fromBlock with the last toBlock used
    filter.toBlock = "latest";

    // And query:
    provider.getLogs(filter).then((logs:any) => {
        logs.forEach((tx: any) => {
            console.log(sf.agreements.cfa.interface.parseLog(tx));
        });
    });
}
