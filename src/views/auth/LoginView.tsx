import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { Link } from "react-router-dom";
import {useMutation} from '@tanstack/react-query'
import ErrorMessage from "@/components/ErrorMessage";
import loginImage from '/DeSiteLogo.webp';
import backgroundImage from '/BackgroundLogin.webp';
import { authenticateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";


export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const {mutate}=useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            toast.error(error.message)

        },
        onSuccess: () => {
            toast.success('LOGIN USER...')


        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData)

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
                            onSubmit={handleSubmit(handleLogin)}
                            className="space-y-8 py-20 bg-white"
                            noValidate
                        >
                            <div className="flex flex-col gap-5">
                                <label className="font-OpenSans text-3xl text-center">LOGIN</label>
                                <br />
                                <label className="font-OpenSans text-2xl">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-3 border-gray-300 border"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Invalid Email",
                                        },
                                    })}
                                />
                                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                            </div>
                            <div className="flex flex-col gap-5">
                                <label className="font-OpenSans text-2xl">Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-3 border-gray-300 border"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                />
                                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                            </div>
                            <input
                                type="submit"
                                value='LOGIN'
                                className="bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] w-full p-3 text-white font-OpenSans text-xl cursor-pointer"
                            />
                            <nav className="mt-10 flex flex-col space-y-4 hover:text-[#196DBB] text-center text-lg font-OpenSans">
                            <Link to={'/auth/register'}>I don't have an account, SIGN UP.</Link>
                            </nav>
                            <nav className="mt-10 flex flex-col space-y-4 hover:text-[#196DBB] text-center text-lg font-OpenSans">
                            <Link to={'/auth/forgot-password'}>Forgot your password? RESET PASSWORD</Link>
                            </nav>
                        </form>
                        
                    </div>
                </div>
            </div>
        </>
       
    )
}