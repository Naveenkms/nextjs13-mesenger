import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
    appId: "1529488",
    key: "5a32dede6b4953367717",
    secret: process.env.APP_SECRET!,
    cluster: "ap2",
    useTLS: true
  })

export const clientPusher = new ClientPusher("5a32dede6b4953367717", {
    cluster: "ap2",
    forceTLS: true
  })