"use client"

import { signIn, signOut} from "next-auth/react";


const LogBtn = ({ text, session }: any) => {
  return (
    <>
      {session ? <button onClick={() => signOut()} className="bg-blue-500 hover:bg-blue-700 px-5 py-2 text-white font-bold rounded">{text}</button>
        : <button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-700 px-5 py-2 text-white font-bold rounded">{text}</button>

      }
    </>
  )
}

export default LogBtn