// const express = require("express");
require('dotenv').config();
import { sdk } from "./config/config";

const sendLowBalanceNotif = (address: string, token: string) => {
  const title: string = "Your stream is running out of funds!";
  const message: string = `Top up your balance of ${token} or your stream will run dry`;
  const pTitle: string = `Low balance for ${address}`;
  const pMessage: string = `${address} is running low on ${token}`;
  // set to true for dev, false for prod
  try {
    sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false).then(() => console.log("notif sent"));
  } catch (e) {
    console.error(e);
  }
}

const streamCancelled = (address: string, token: string) => {
  const title: string = "Your stream has been cancelled";
  const message: string = `Your stream of ${token} has been cancelled`;
  const pTitle: string = `Cancelled stream for ${address}`;
  const pMessage: string = `${address} had a stream cancelled of ${token}`;
  try {
    sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false).then(() => console.log("notif sent"));
  } catch (e) {
    console.error(e);
  }
}

const streamHasRunOut = (address: string, token: string) => {
  const title: string = "Your stream has run out of funds!";
  const message: string = `Your stream of ${token} has run out of funds`;
  const pTitle: string = `Dry stream for ${address}`;
  const pMessage: string = `${address} had a stream of ${token} run out of funds`;
  try {
    sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false).then(() => console.log("notif sent"));
  } catch (e) {
    console.error(e);
  }
}

const newIncomingStream = (address: string, token: string) => {
  const title: string = "You have a new stream!";
  const message: string = `You have a new incoming stream of ${token}`;
  const pTitle: string = `New stream for ${address}`;
  const pMessage: string = `${address} has a new stream of ${token}`;
  try {
    sdk.sendNotification(address, title, message, pTitle, pMessage, 3, false).then(() => console.log("notif sent"));
  } catch (e) {
    console.error(e);
  }
}

const getSubs = async () => {
  try {
    let users = await sdk.getSubscribedUsers();
    console.log(users);
  } catch (e) {
    console.error(e)
  };
}

const johnsmeta = "0x0f14E34723997e1E1e2B7E3760178c98B22651ab";

// getSubs();
// sendLowBalanceNotif(johnsmeta, "ETHx");

// const app = express();
// const port = process.env.PORT;

// // routes
// app.get('/', (_: any, res: any) => {
//   res.status(200).send()
// })

// app.listen(port, () => console.log(`Running on port ${port}`));

// ISSUES
// contract isn't being instantiated and so signingContract.sendNotification() 
//    throws error as it is "not a function"