import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-toastify'
import TimeSheetForm from "@/components/TimeSheets/TimeSheetForm";
import { TimeSheetFormData } from "@/types/index";
import { createTimeSheet } from "@/api/TimeSheetAPI";

export default function CreateTimeSheetView(){
    const navigate = useNavigate()
    //initial form values
    const initialValues: TimeSheetFormData ={
        date:new Date(),
        checkInTime:"",
        lunchTimeStart:"",
        lunchTimeEnd:"",
        departureTime:"",
        totalHours:0,
        bankTime:0
    }
    // using react hook form
    const{register, handleSubmit,formState:{errors} }= useForm({defaultValues:initialValues})

    //useMutation
    const {mutate} = useMutation({
        mutationFn: createTimeSheet,
        onError:(error) => {
            toast.error(error.message)
            
        },
        onSuccess:(data) => {
            toast.success(data)
            navigate('/')
        }
    })

    //function handleSubmit
    const handleForm = (formData:TimeSheetFormData) => mutate(formData) 
    return (
        <>
            <nav className="my-5">
                <Link 
                    className="bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] px-10 py-3 text-white text-xl font-OpenSans cursor-pointer transition-colors rounded-lg text-center items-center" to='/'> Return to Time Sheets
                </Link>
            </nav>
            <div className="text-center max-w-3xl mx-auto">
               
                <h1 className="text-5xl text-white text-center font-OpenSans"> CREATE NEW TIME SHEET</h1>
                <br/>
                <p className="text-2xl text-white font-ligth text-center font-OpenSans"> Please fill out the following form to add a new Timesheet</p>
                <form 
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <TimeSheetForm
                        register={register}
                        errors={errors}
                    />
                    <input 
                        type="submit"
                        value= 'CREATE NEW TIME SHEET'
                        className=" bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] w-full p-3 text-white font-OpenSans cursor-pointer transition-colors rounded-lg text-xl"
                    />
                </form>
            </div>
         
        </>
    )

}