const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { AlchemyProvider } = require("@ethersproject/providers");
const { Wallet } = require("@ethersproject/wallet");
const { networkSecrets, accountSecrets } = require('./config/config');
const { getChannelSubscribers } = require("./epns");
const { BigNumber } = require('@ethersproject/bignumber');

import { lowBalanceWarning, streamCancelledAlert, streamHasRunOutAlert, newIncomingStreamAlert } from "./epns";

const provider = new AlchemyProvider("ropsten", networkSecrets.alchemyKey);

const supportedTokens = ["ETHx"];
const tokenAddresses = new Map();

const sf = new SuperfluidSDK.Framework({
    ethers: provider,
    tokens: supportedTokens
});

export const initSF = async () => { 
    await sf.initialize();
    tokenAddresses.set("0x6fC99F5591b51583ba15A8C2572408257A1D2797", "ETHx");
    superfluidMain();
}

const superfluidMain = async () => {
    var subscribers: string[] = await getChannelSubscribers();
    checkForLowBalances(subscribers);
    checkForUpdatedStream(subscribers);
}

const msPerDay = 86400000;
const msPerMin = 60000;

var lowBalNotificationMap = new Map();

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
                        // need to check if we've already notified (currently once per day within 5 days)
                        if (lowBalNotificationMap.has(address)) {
                            let tokenMap = lowBalNotificationMap.get(address);
                            var sentTime = tokenMap.get(token);
                            if (now - sentTime > msPerDay) {
                                tokenMap.set(token, now);
                                lowBalNotificationMap.set(address, tokenMap);
                                lowBalanceWarning(address, token, daysRemaining);
                            }
                        } else {
                            let tokenMap = new Map();
                            tokenMap.set(token, now);
                            lowBalNotificationMap.set(address, tokenMap);
                            lowBalanceWarning(address, token, daysRemaining);
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            }
        })
    })
    setTimeout(superfluidMain, 10 * msPerMin);
}

const streamUpdateNotifs: string[] = [];

const checkForUpdatedStream = async (subscribers: string[]) => {
    // Filters events on ConstantFlowAgreement contract for FlowUpdated() events in last few blocks
    let filter = sf.agreements.cfa.filters.FlowUpdated() 

    // Set block range 
    filter.fromBlock = provider.getBlockNumber().then((b:number) => b - 10000); // To do: replace fromBlock with the last toBlock used
    filter.toBlock = "latest";

    // And query:
    provider.getLogs(filter).then((logs: any) => {
        logs.forEach((tx: any) => {
            let flowUpdatedEvent = sf.agreements.cfa.interface.parseLog(tx);
            let eventID = tx.transactionHash;
            let tokenAddress = flowUpdatedEvent.args["token"];
            let token = tokenAddresses.get(tokenAddress);
            let sender = flowUpdatedEvent.args["sender"];
            let receiver = flowUpdatedEvent.args["receiver"];
            let flowRate = flowUpdatedEvent.args["flowRate"];

            if (streamUpdateNotifs.indexOf(eventID) == -1) {
                streamUpdateNotifs.push(eventID);

                if (subscribers.indexOf(receiver) >= 0) {
                    if (flowRate.gt(0)) {
                        // if flow > 0 -> new incoming stream
                        newIncomingStreamAlert(receiver, token, sender);
                    } else if (flowRate.eq(0)) {
                        // if flow == 0 -> incoming stream cancelled
                        streamCancelledAlert(receiver, token, sender);
                    }
                }
    
                if (subscribers.indexOf(sender) >= 0) {
                    if (flowRate.eq(0)) {
                        // if flow == 0 -> outgoing stream ended
                        streamHasRunOutAlert(sender, token, receiver);
                    }
                }
            }
        });
    });
    setTimeout(superfluidMain, 10 * msPerMin);
}
