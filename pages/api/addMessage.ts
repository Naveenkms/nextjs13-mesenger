import type { NextApiRequest, NextApiResponse } from 'next';
import { serverPusher } from '../../pusher';
import redis from "../../redis"
import { Message } from '../../typings';

type Data = {
  message: Message
}

type ErrorData = {
    error: string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    
    if(req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed"});
    }

    const {message} = req.body;


    const newMessage = {
        ...message,
        created_at: Date.now(),
    }

try {
    const exist = await redis.hset("messages",message.id, JSON.stringify(newMessage));
    serverPusher.trigger("messages", "new-message", newMessage);
    console.log("message added to redis");
}

catch (err) {
    console.log("coonection to redisfailed");
    
}
 
  res.status(200).json({ message: newMessage })
}