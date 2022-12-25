"use client";
import { SessionProvider } from "next-auth/react";
import { Children } from "react";
const Providers = ({ session, children }: any) => {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}

export default Providers