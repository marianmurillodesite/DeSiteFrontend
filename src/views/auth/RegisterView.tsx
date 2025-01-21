import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {useMutation} from '@tanstack/react-query'
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import loginImage from '/DeSiteLogo.webp';
import backgroundImage from '/BackgroundLogin.webp';
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";


export default function RegisterView() {

    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }
    // react hook forms 
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });
    // mutation 
    const {mutate} = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message)

        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            
        }
    })

    const password = watch('password');

    // form submit function 
    const handleRegister = (formData: UserRegistrationForm) => mutate(formData)

    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen">
                <div className="w-full md:w-1/2 flex justify-center items-center relative bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="md:w-2/3 flex flex-col justify-center items-center z-10">
                        <img src={loginImage} alt="Login" className="mb-4" style={{ width: '300px', height: '150px' }} />
                        <h2 className="labelTitleWhite font-bold mb-6 text-white text-3xl font-OpenSans">DeSite Administrator</h2>
                        <p className="text-white text-center text-2xl font-OpenSans">Keep your time sheet up to date using our automatic system in real time.</p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center bg-[#0A327C]">
                    <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white">

                        <form
                            onSubmit={handleSubmit(handleRegister)}
                            className="space-y-8   bg-white mt-10"
                            noValidate
                        >
                            
                            <div className="flex flex-col gap-5">
                                <label className="font-OpenSans text-3xl text-center">SIGN UP</label>
                                <label
                                    className="font-OpenSans text-2xl"
                                    htmlFor="email"
                                >EMAIL</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email "
                                    className="w-full p-3  border-gray-300 border"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Invalid Email",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                                )}
                            </div>

                            <div className="flex flex-col gap-5">
                                <label
                                    className="font-OpenSans text-2xl"
                                >FULL NAME</label>
                                <input
                                    type="name"
                                    placeholder="Full Name"
                                    className="w-full p-3  border-gray-300 border"
                                    {...register("name", {
                                        required: "Full Name is required",
                                    })}
                                />
                                {errors.name && (
                                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                                )}
                            </div>

                            <div className="flex flex-col gap-5">
                                <label
                                    className="font-OpenSans text-2xl"
                                >PASSWORD</label>

                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-3  border-gray-300 border"
                                    {...register("password", {
                                        required: " Password is required",
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
                                    className="font-normal text-2xl"
                                >CONFIRM PASSWORD</label>

                                <input
                                    id="password_confirmation"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full p-3  border-gray-300 border"
                                    {...register("password_confirmation", {
                                        required: "This Field is required",
                                        validate: value => value === password || 'Password Incorrect'
                                    })}
                                />

                                {errors.password_confirmation && (
                                    <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                                )}
                            </div>

                            <input
                                type="submit"
                                value='SIGN UP'
                                className="bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] w-full p-3 text-white font-OpenSans text-xl cursor-pointer"
                            />
                            <nav className="mt-10 flex flex-col space-y-4 hover:text-[#196DBB] text-center text-lg font-OpenSans">
                            <Link to={'/auth/login'}>I have an account, LOGIN.</Link>
                            </nav>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}