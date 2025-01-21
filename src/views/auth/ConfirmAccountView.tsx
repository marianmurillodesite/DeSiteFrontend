import { useState } from "react";
import { Link} from "react-router-dom";
import {PinInput, PinInputField } from '@chakra-ui/pin-input'
import {useMutation} from '@tanstack/react-query'
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken['token']>('')
 
  const {mutate} = useMutation({
      mutationFn: confirmAccount,
      onError: (error) => {
          toast.error(error.message)

      },
      onSuccess: (data) => {
          toast.success(data)
          

      }
  })

  const handleChange =(token:ConfirmToken['token'])=>{
    setToken(token)
  }

  const handleComplete =(token:ConfirmToken['token'])=>mutate({token})
  return (
    <>
          <div className="w-full mt-40 flex justify-center items-center bg-[#0A327C]">
              <div className="p-8 rounded-lg shadow-lg w-full max-w-lg bg-white">
                  <h1 className="font-OpenSans font-bold text-4xl text-center">CONFIRM YOUR ACCOUNT</h1>
                  <p className="text-2xl font-OpenSans text-black mt-5">
                      Enter the code you received {''}
                      <span className=" text-[#196DBB] font-OpenSans font-bold"> by Email</span>
                  </p>
                  <form
                      className="space-y-8 p-4 bg-white mt-10 rounded-lg"
                  >
                      <label
                          className="font-OpenSans font-normal text-2xl text-center block"
                      >6 digit code</label>
                      <div className="flex justify-center gap-5">
                        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                            <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black"/>
                            <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black"/>
                            <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black"/>
                            <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black"/>
                            <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black"/>
                            <PinInputField className="w-10 h-10 p-3 rouded-lg border-gray-300 border placeholder-black"/>
                        </PinInput>   
                      </div>

                  </form>

                  <nav className="mt-10 flex flex-col space-y-4">
                      <Link
                          to='/auth/request-code'
                          className="mt-10 flex flex-col space-y-4 hover:text-[#196DBB] text-center text-lg font-OpenSans"
                      >
                          Request a new Code
                      </Link>
                  </nav>
              </div>
          </div>
      </>
  )
}