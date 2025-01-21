import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
  const [token, setToken]= useState<ConfirmToken['token']>('')
  const [isValidToken, setIsValidToken]=useState(false)
  return (
    <>
      <div className="w-full mt-40 flex justify-center items-center bg-[#0A327C]">
              <div className="p-8 rounded-lg shadow-lg w-full max-w-lg bg-white">
                  <h1 className="font-OpenSans font-bold text-4xl text-center">RESET PASSWORD</h1>
                 {!isValidToken?
                 <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/>:
                 <NewPasswordForm  token={token}/>
                  }
              </div>
          </div>
    </>
  )
}
