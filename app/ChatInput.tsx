"use client";
import { unstable_getServerSession } from "next-auth";
import { FormEvent, useState } from "react";
import useSWR from "swr";

import { v4 as uuid } from 'uuid';
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";

type Props = {
    session: Awaited<ReturnType<typeof unstable_getServerSession>>
}

const ChatInput = ({session}: Props) => {
    const [input, setInput] = useState("");
    const {data: messages, error, mutate, isLoading} = useSWR("/api/getMessages", fetcher);

    const addMessage = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
console.log("session",session);
        if(!input || !session ) return;

        const messageToSend = input;
        setInput("");

        const id = uuid();

        const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: session?.user?.name!,
            profilePic: session?.user?.image!,
            email: session?.user?.email!
        }

        const uploadMessageToUpstash = async() => {
            const res = await fetch("/api/addMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({message})
            });

            const data = await res.json();
            const addedMessage = data.message  ;
        return [addedMessage, ...messages!];
            
        }

       await mutate(uploadMessageToUpstash, {
        optimisticData: [message, ...messages!],
        rollbackOnError: true,
       })

    }
    return (
        <form onSubmit={addMessage} className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 md:space-x-4 bg-white" >
            <input type="text" value={input} disabled={!session} onChange={e => setInput(e.target.value)} className="flex-grow rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed" />

            <button type="submit" disabled={!input} className="bg-blue-500 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 text-white font-bold rounded">Send</button>
        </form>
    )
}

export default ChatInput