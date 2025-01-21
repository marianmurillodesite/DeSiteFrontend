import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useMutation} from '@tanstack/react-query'
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { requestConfirmationCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: RequestConfirmationCodeForm = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    //mutation 
    const {mutate} = useMutation({
        mutationFn: requestConfirmationCode,
        onError: (error) => {
            toast.error(error.message)

        },
        onSuccess: (data) => {
            toast.success(data)


        }
    })

    const handleRequestCode = (formData: RequestConfirmationCodeForm) => mutate(formData)

    return (
        <>

<div className="w-full mt-40 flex justify-center items-center bg-[#0A327C]">
                <div className="p-8 rounded-lg shadow-lg w-full max-w-lg bg-white">
                    <h1 className="font-OpenSans font-bold text-4xl text-center">REQUEST NEW CODE</h1>
                    <p className="text-2xl font-OpenSans text-black mt-5 text-center">
                        Enter your email to receive {''}
                        <span className=" text-[#196DBB] text-center font-OpenSans font-bold"> a new confirmation code</span>
                    </p>
                    <form
                        onSubmit={handleSubmit(handleRequestCode)}
                        className="space-y-8 p-10 rounded-lg bg-white mt-10"
                        noValidate
                    >
                        <div className="flex flex-col gap-5">
                            <label
                                className="font-OpenSans text-2xl"
                                htmlFor="email"
                            >Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 rounded-lg border-gray-300 border"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "Invalid email",
                                    },
                                })}
                            />
                            {errors.email && (
                                <ErrorMessage>{errors.email.message}</ErrorMessage>
                            )}
                        </div>

                        <input
                            type="submit"
                            value='SEND CODE'
                            className="bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] w-full p-3 text-white font-OpenSans text-xl cursor-pointer "
                        />
                    </form>

                    <nav className="mt-10 flex flex-col space-y-4">
                        <Link
                            to='/auth/login'
                            className="text-center text-[#0A327C]  hover:text-[#196DBB] font-normal"
                        >
                            Already have an account? LOGIN
                        </Link>
                        <Link
                            to='/auth/forgot-password'
                            className="text-center text-[#0A327C]  hover:text-[#196DBB] font-normal"
                        >
                            Forgot your password? RESET PASSWORD
                        </Link>
                    </nav>
                </div>
            </div>

        </>
    )
}