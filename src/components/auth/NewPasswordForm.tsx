import type { ConfirmToken, NewPasswordForm } from "../../types";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";
type NewPasswordFormProps = {
    token:ConfirmToken['token']
}

export default function NewPasswordForm({token}:NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        password: '',
        password_confirmation: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: updatePasswordWithToken,
        onError: (error) => {
            toast.error(error.message)

        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')

        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data ={
            formData,
            token
        }
        mutate(data)
    }

    const password = watch('password');

    return (
        <>
            <p className="text-2xl font-OpenSans text-black mt-5 text-center">
                Enter a password {''}
                <span className=" text-[#196DBB] font-OpenSans font-bold"> to set new password</span>
            </p>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-4 bg-white mt-10 rounded-lg"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-OpenSans font-normal text-2xl block"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: 'The password must be at least 8 characters long'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-OpenSans font-normal text-2xl block"
                    >Confirm Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full p-3 rounded-lg border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Confirm Password is required",
                            validate: value => value === password || 'Passwords are not equal'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='SET NEW PASSWORD'
                    className="bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] w-full p-3 text-white font-OpenSans text-xl cursor-pointer"
                />
            </form>
        </>
    )
}