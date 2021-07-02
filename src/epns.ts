import { sdk } from "./config/config";

const devMode = true;

// notifies subscriber when their stream is running low on funds
export const lowBalanceWarning = async (address: string, token: string, daysRemaining: any) => {
  const daysRem = parseFloat(daysRemaining).toFixed(1);
  const title: string = "Your stream is running out of funds!";
  const message: string = `Top up your balance of ${token} or your streams will run dry in ${daysRem} days`;
  const pTitle: string = `Low balance for ${address}`;
  const pMessage: string = `${address} is running low on ${token}`;
  try {
    await sdk.sendNotification(address, title, message, pTitle, pMessage, 3, devMode);
  } catch (e) {
    console.error(e);
  }
}

// notifies user when a stream of theirs has been cancelled
export const streamCancelledAlert = async (address: string, token: string) => {
  const title: string = "Your stream has been cancelled";
  const message: string = `Your stream of ${token} has been cancelled`;
  const pTitle: string = `Cancelled stream for ${address}`;
  const pMessage: string = `${address} had a stream cancelled of ${token}`;
  try {
    await sdk.sendNotification(address, title, message, pTitle, pMessage, 3, devMode);
  } catch (e) {
    console.error(e);
  }
}

// notifies subscriber when one of their streams has run out
export const streamHasRunOutAlert = async (address: string, token: string) => {
  const title: string = "Your stream has run out of funds!";
  const message: string = `Your stream of ${token} has run out of funds`;
  const pTitle: string = `Dry stream for ${address}`;
  const pMessage: string = `${address} had a stream of ${token} run out of funds`;
  try {
    await sdk.sendNotification(address, title, message, pTitle, pMessage, 3, devMode);
  } catch (e) {
    console.error(e);
  }
}

// notifies a subscriber when they receive a new stream
export const newIncomingStreamAlert = async (address: string, token: string) => {
  const title: string = "You have a new stream!";
  const message: string = `You have a new incoming stream of ${token}`;
  const pTitle: string = `New stream for ${address}`;
  const pMessage: string = `${address} has a new stream of ${token}`;
  try {
    await sdk.sendNotification(address, title, message, pTitle, pMessage, 3, devMode);
  } catch (e) {
    console.error(e);
  }
}

// returns an array of addresses (strings) that are currently subbed to the channel
export const getChannelSubscribers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await sdk.getSubscribedUsers();
      resolve(users);
    } catch (e) {
      reject(e);
    };
  })
}