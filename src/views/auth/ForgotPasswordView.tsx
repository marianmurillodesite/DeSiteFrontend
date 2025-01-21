import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {useMutation} from '@tanstack/react-query'
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
  
  const {mutate} = useMutation({
    mutationFn:forgotPassword,
      onError: (error) => {
          toast.error(error.message)

      },
      onSuccess: (data) => {
          toast.success(data)
          reset()
      }
  })
  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)
  return (
    <>
          <div className="w-full mt-40 flex justify-center items-center bg-[#0A327C]">
              <div className="p-8 rounded-lg shadow-lg w-full max-w-lg bg-white">
                  <h1 className="font-OpenSans text-4xl text-center">RESET YOUR PASSWORD</h1>
                  <p className="text-2xl font-OpenSans text-black mt-5 text-center">
                      Forgot your password ? Enter your email and{''}
                      <span className=" text-[#196DBB] font-OpenSans font-bold"> reset your password</span>
                  </p>
                  <form
                      onSubmit={handleSubmit(handleForgotPassword)}
                      className="space-y-8 p-4 bg-white mt-10 rounded-lg"
                      noValidate
                  >
                      <div className="flex flex-col gap-5">
                          <label
                              className="font-OpenSans font-normal text-2xl block"
                              htmlFor="email"
                          >Email</label>
                          <input
                              id="email"
                              type="email"
                              placeholder="Email"
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

                      <input
                          type="submit"
                          value='SEND INSTRUCTIONS'
                          className="bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] w-full p-3 text-white font-OpenSans text-xl cursor-pointer"
                      />
                  </form>

                  <nav className="mt-10 flex flex-col space-y-4">
                      <Link
                          to='/auth/login'
                          className="mt-10 flex flex-col space-y-4 hover:text-[#196DBB] text-center text-lg font-OpenSans"
                      >
                          Already have an account? LOGIN
                      </Link>

                      <Link
                          to='/auth/register'
                          className="mt-10 flex flex-col space-y-4 hover:text-[#196DBB] text-center text-lg font-OpenSans"
                      >
                          Don't have an account? SIGN UP
                      </Link>
                  </nav>
              </div>
          </div>
      </>
  )
}
