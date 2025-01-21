import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import {useMutation} from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { ConfirmToken } from '@/types/index';
import { validateToken } from '@/api/AuthAPI';
import { toast } from 'react-toastify';
type NewPasswordTokenProps = {
    token:ConfirmToken['token']
    setToken: React.Dispatch<React.SetStateAction<string>>
    setIsValidToken: React.Dispatch<React.SetStateAction<boolean>>

}
export default function NewPasswordToken({token, setToken, setIsValidToken}: NewPasswordTokenProps) {
    const {mutate} = useMutation({
        mutationFn:validateToken,
        onError: (error) => {
            toast.error(error.message)

        },
        onSuccess: (data) => {
            toast.success(data)
            setIsValidToken(true)

        }
    })

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token)
     }
    const handleComplete = (token: ConfirmToken['token']) => mutate({token})
    return (
        <>
            <p className="text-2xl font-OpenSans text-black mt-5 text-center">
                Enter the code you received {''}
                <span className=" text-[#196DBB] font-OpenSans font-bold"> by Email</span>
            </p>
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >6 digit code</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black" />
                        <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black" />
                        <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black" />
                        <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black" />
                        <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black" />
                        <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/forgot-password'
                    className="mt-10 flex flex-col space-y-4 hover:text-[#196DBB] text-center text-lg font-OpenSans"
                >
                    Request a new Code
                </Link>
            </nav>
        </>
    )
}