const express = require("express");
require('dotenv').config();
import { sdk } from "./config/config";

// controllers

// main
const app = express();

// middlewares
const lowBalanceNotif = (address: string, token: string) => {
  const title: string = "Your stream is running out of funds!";
  const message: string = `Top up your balance of ${token} or your stream will run dry`;
  const pTitle: string = `Low balance notif for ${address}`;
  const pMessage: string = `${address} is running low on ${token}`;
  // set to true for dev, false for prod
  sdk.sendNotification(address, title, message, pTitle, pMessage, 3, true).then(() => console.log("sent"))
}

const getSubs = async () => {
  const users = await sdk.getSubscribedUsers();
  console.log(users);
}

// getSubs();
// lowBalanceNotif("abc", "ETHx");

// constants
const port = process.env.PORT;

// routes
app.get('/', (_: any, res: any) => {
  res.status(200).send()
})

app.listen(port, () => console.log(`Running on port ${port}`));