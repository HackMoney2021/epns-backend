// const express = require("express");
require('dotenv').config();
import { sdk } from "./config/config";

// const app = express();

const sendLowBalanceNotif = (address: string, token: string) => {
  const title: string = "Your stream is running out of funds!";
  const message: string = `Top up your balance of ${token} or your stream will run dry`;
  const pTitle: string = `Low balance notif for ${address}`;
  const pMessage: string = `${address} is running low on ${token}`;
  // set to true for dev, false for prod
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

// console.log(sdk);
// getSubs();
sendLowBalanceNotif(johnsmeta, "ETHx");

// constants
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

// ISSUES
// contract isn't being instantiated and so signingContract.sendNotification() throws error as it is "not a function"