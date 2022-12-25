import type { NextApiRequest, NextApiResponse } from 'next';
import redis from "../../redis"
import { Message } from '../../typings';

type Data = {
  messages: Message[]
}

type ErrorData = {
    error: string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    
    if(req.method !== "GET") {
        res.status(405).json({ error: "Method Not Allowed"});
    }

    const messageRes = await redis.hvals("messages");
    const messages:Message[] = messageRes.map(message => JSON.parse(message)).sort( (a, b) => b.created_at - a.created_at);


 
  res.status(200).json({ messages })
}