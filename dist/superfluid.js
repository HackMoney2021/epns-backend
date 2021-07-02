"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSF = void 0;
const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { AlchemyProvider } = require("@ethersproject/providers");
const { Wallet } = require("@ethersproject/wallet");
const { Contract } = require("@ethersproject/contracts");
const { networkSecrets, accountSecrets } = require('./config/config');
const { getChannelSubscribers } = require("./epns");
const { BigNumber } = require('@ethersproject/bignumber');
const epns_1 = require("./epns");
const provider = new AlchemyProvider("ropsten", networkSecrets.alchemyKey);
const signer = new Wallet(accountSecrets.privateKey, provider);
const sf = new SuperfluidSDK.Framework({
    ethers: provider,
    tokens: ["ETHx"]
});
const initSF = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sf.initialize();
    superfluidMain();
});
exports.initSF = initSF;
const superfluidMain = () => __awaiter(void 0, void 0, void 0, function* () {
    var subscribers = yield getChannelSubscribers();
    checkForLowBalances(subscribers);
});
var lowBalanceNotifSentMap = new Map();
const checkForLowBalances = (subscribers) => __awaiter(void 0, void 0, void 0, function* () {
    subscribers.forEach((address) => __awaiter(void 0, void 0, void 0, function* () {
        // initialises superfluid user object
        let user = sf.user({ address: address, token: sf.tokens.ETHx.address });
        try {
            // returns account details of user
            var details = yield user.details();
            let netFlow = details.cfa.netFlow;
            // if users outgoing > incoming
            if (netFlow < 0) {
                const ethxContract = new Contract(sf.tokens.ETHx.address, sf.contracts.ISuperToken.abi, signer);
                var balance = yield ethxContract.realtimeBalanceOfNow(address);
                var available = balance.availableBalance;
                var bigNumberNetFlow = BigNumber.from(netFlow * -1);
                let timeRemaining = available.div(bigNumberNetFlow);
                let daysRemaining = (((timeRemaining / 60) / 60) / 24);
                if (daysRemaining < 5) {
                    var date = new Date();
                    var now = date.getTime();
                    if (lowBalanceNotifSentMap.has(address)) {
                        var sentTime = lowBalanceNotifSentMap.get(address);
                        // 86400000 ms in a day
                        if (now - sentTime > 86400000) {
                            lowBalanceNotifSentMap.set(address, now);
                            epns_1.lowBalanceWarning(address, 'ETHx', daysRemaining.toString());
                        }
                        else {
                            console.log(`low bal for ${address} - notif already sent`);
                        }
                    }
                    else {
                        lowBalanceNotifSentMap.set(address, now);
                        epns_1.lowBalanceWarning(address, 'ETHx', daysRemaining.toString());
                    }
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }));
    // check for new subs every min
    setTimeout(superfluidMain, 60000);
});
//# sourceMappingURL=superfluid.js.map