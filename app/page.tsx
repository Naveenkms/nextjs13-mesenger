import { unstable_getServerSession } from "next-auth";
import { Message } from "../typings";
import ChatInput from "./ChatInput"
import MessageList from "./MessageList";
import Providers from "./Providers";

const Homepage = async () => {
    const data = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`).then(res => res.json());
    const initialMessages: Message[] = data.messages!;

    const session = await unstable_getServerSession();

    return (
        <Providers session={session} >

            <main className="text-4x">

                <MessageList initialMessages={initialMessages} />

                <ChatInput session={session} />

            </main>
        </Providers>
    )
}

export default Homepage