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
// notifies subscriber when their stream is running low on funds
const lowBalanceWarning = (address, token) => __awaiter(void 0, void 0, void 0, function* () {
    const title = "Your stream is running out of funds!";
    const message = `Top up your balance of ${token} or your stream will run dry`;
    const pTitle = `Low balance for ${address}`;
    const pMessage = `${address} is running low on ${token}`;
    try {
        yield config_1.sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false);
    }
    catch (e) {
        console.error(e);
    }
});
// notifies user when a stream of theirs has been cancelled
const streamCancelledAlert = (address, token) => __awaiter(void 0, void 0, void 0, function* () {
    const title = "Your stream has been cancelled";
    const message = `Your stream of ${token} has been cancelled`;
    const pTitle = `Cancelled stream for ${address}`;
    const pMessage = `${address} had a stream cancelled of ${token}`;
    try {
        yield config_1.sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false);
    }
    catch (e) {
        console.error(e);
    }
});
// notifies subscriber when one of their streams has run out
const streamHasRunOutAlert = (address, token) => __awaiter(void 0, void 0, void 0, function* () {
    const title = "Your stream has run out of funds!";
    const message = `Your stream of ${token} has run out of funds`;
    const pTitle = `Dry stream for ${address}`;
    const pMessage = `${address} had a stream of ${token} run out of funds`;
    try {
        yield config_1.sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false);
    }
    catch (e) {
        console.error(e);
    }
});
// notifies a subscriber when they receive a new stream
const newIncomingStreamAlert = (address, token) => __awaiter(void 0, void 0, void 0, function* () {
    const title = "You have a new stream!";
    const message = `You have a new incoming stream of ${token}`;
    const pTitle = `New stream for ${address}`;
    const pMessage = `${address} has a new stream of ${token}`;
    try {
        yield config_1.sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false);
    }
    catch (e) {
        console.error(e);
    }
});
// returns an array of addresses (strings) that are currently subbed to the channel
const getChannelSubscribers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield config_1.sdk.getSubscribedUsers();
        console.log(users);
    }
    catch (e) {
        console.error(e);
    }
    ;
});
const app = express();
const port = process.env.PORT;
// routes
app.get('/', (_, res) => {
    res.status(200).send();
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map