"use client";
import { getProviders, signIn } from "next-auth/react";

type Props = {
    providers: Awaited<ReturnType<typeof getProviders>>
}

const SignInComponent = ({providers}: Props) => {
    
  return (
    <div>
       {Object.values(providers!).map(provider => (
        <div key={provider.name}>
            <button onClick={() => signIn(provider.id, {
                callbackUrl: process.env.VERCEL_URL || "http://localhost:300/auth/signin"
            })} className="bg-blue-500 py-2 px-3 rounded-md"> SignIn with {provider.name}</button>
        </div>
       ))}
    </div>
  )
}

export default SignInComponent