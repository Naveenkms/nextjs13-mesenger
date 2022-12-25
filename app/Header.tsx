import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import LogBtn from "./LogBtn";
import Providers from "./Providers";


async function Header() {
  const session = await unstable_getServerSession()

  if (session) {
    return (
      <Providers session={session} >
      <header className="sticky top-0 z-50 p-10 bg-white shadow-sm flex space-y-5 justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="https://cdn-icons-png.flaticon.com/512/6033/6033716.png" alt="Profile Picture" className="w-[25px] h-[25px] object-fill" />
          <div>
            <div className="text-blue-400">Logged in as:</div>
            <div className="font-bold">{session.user?.name}</div>
          </div>
        </div>

        <LogBtn text="Sign Out" session={session} />
      </header >
      </Providers >
    )
  }
  return (
    <header className="sticky top-0 z-50 p-10 bg-white shadow-sm flex flex-col space-y-5 items-center">

      <div className="flex space-x-2 items-center">
        <img src="https://cdn-icons-png.flaticon.com/512/6033/6033716.png" alt="Meta Messenger" className="w-[25px] h-[25px] object-fill" />
        <p className="text-blue-400">Welcome to Meta Messenger</p>
      </div>

      <Link href="/auth/signin" className="bg-blue-500 py-2 px-3 rounded-md">Sign In</Link>

    </header>
  )
}

export default Header;
