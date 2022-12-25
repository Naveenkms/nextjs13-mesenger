import { getProviders } from "next-auth/react"
import Image from "next/image";
import SignInComponent from "./SignInComponent";
const SignIn = async() => {
    const providers = await getProviders();

    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <div>
                <Image className="rounded-full mx-2 my-6 object-cover" width={200} height={200} src="https://cdn-icons-png.flaticon.com/512/5968/5968771.png" alt="Messenger Logo" />
            </div>
            <SignInComponent providers={providers} />
        </div>
    )
}

export default SignIn