import { Message } from "../typings";

const fetcher = async() => {
    const res = await fetch("/api/getMessages");
    const data = await res.json();
    const message: Message[] = data.messages;

    

    return message;
}

export default fetcher;