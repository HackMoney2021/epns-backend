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
const sendLowBalanceNotif = (address, token) => __awaiter(void 0, void 0, void 0, function* () {
    const title = "Your stream is running out of funds!";
    const message = `Top up your balance of ${token} or your stream will run dry`;
    const pTitle = `Low balance for ${address}`;
    const pMessage = `${address} is running low on ${token}`;
    // set to true for dev, false for prod
    try {
        yield config_1.sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false);
    }
    catch (e) {
        console.error(e);
    }
});
const streamCancelled = (address, token) => __awaiter(void 0, void 0, void 0, function* () {
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
const streamHasRunOut = (address, token) => __awaiter(void 0, void 0, void 0, function* () {
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
const newIncomingStream = (address, token) => __awaiter(void 0, void 0, void 0, function* () {
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
const app = express();
const port = process.env.PORT;
// routes
app.get('/', (_, res) => {
    res.status(200).send();
});
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map