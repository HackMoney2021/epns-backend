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
const express = require("express");
require('dotenv').config();
const config_1 = require("./config/config");
// controllers
// main
const app = express();
// middlewares
const lowBalanceNotif = (address, token) => {
    const title = "Your stream is running out of funds!";
    const message = `Top up your balance of ${token} or your stream will run dry`;
    const pTitle = `Low balance notif for ${address}`;
    const pMessage = `${address} is running low on ${token}`;
    // set to true for dev, false for prod
    config_1.sdk.sendNotification(address, title, message, pTitle, pMessage, 3, true).then(() => console.log("sent"));
};
const getSubs = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield config_1.sdk.getSubscribedUsers();
    console.log(users);
});
// getSubs();
// lowBalanceNotif("abc", "ETHx");
// constants
const port = process.env.PORT;
// routes
app.get('/', (_, res) => {
    res.status(200).send();
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map