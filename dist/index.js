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
// const express = require("express");
require('dotenv').config();
const config_1 = require("./config/config");
const sendLowBalanceNotif = (address, token) => {
    const title = "Your stream is running out of funds!";
    const message = `Top up your balance of ${token} or your stream will run dry`;
    const pTitle = `Low balance notif for ${address}`;
    const pMessage = `${address} is running low on ${token}`;
    // set to true for dev, false for prod
    try {
        config_1.sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false).then(() => console.log("notif sent"));
    }
    catch (e) {
        console.error(e);
    }
};
const getSubs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield config_1.sdk.getSubscribedUsers();
        console.log(users);
    }
    catch (e) {
        console.error(e);
    }
    ;
});
const johnsmeta = "0x0f14E34723997e1E1e2B7E3760178c98B22651ab";
// console.log(sdk);
// getSubs();
sendLowBalanceNotif(johnsmeta, "ETHx");
// const app = express();
// const port = process.env.PORT;
// // routes
// app.get('/', (_: any, res: any) => {
//   res.status(200).send()
// })
// app.listen(port, () => console.log(`Running on port ${port}`));
// TODO
// use getSubs() to determine what addresses to monitor
// monitor subbed addresses via superfluid sdk -> ping epns methods
// epns methods:
//    - low balance notif: notify user stream will run out in x hours / days idk
//    - incoming / outgoing stream cancelled
//    - outgoing stream run dry
//    - new incoming stream
// ISSUES
// contract isn't being instantiated and so signingContract.sendNotification() throws error as it is "not a function"
//# sourceMappingURL=index.js.map