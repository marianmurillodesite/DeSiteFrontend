import TimeSheetForm from './TimeSheetForm'
import { Link, useNavigate } from 'react-router-dom'
import { TimeSheet, TimeSheetFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { updateTimeSheet } from '@/api/TimeSheetAPI'
import { toast } from 'react-toastify'

type EditTimeSheetFormProps = {
    data: TimeSheetFormData
    timeSheetId: TimeSheet['_id']
}
export default function EditTimeSheetForm({data, timeSheetId}:EditTimeSheetFormProps) {
    console.log(data)
    //navigate hool 
    const navigate = useNavigate()
    
    // using react hook form
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: 
        {
        date: data.date,
        checkInTime: data.checkInTime,
        lunchTimeStart:data.lunchTimeStart,
        lunchTimeEnd: data.lunchTimeEnd,
        departureTime: data.departureTime,
        totalHours: data.totalHours,
        bankTime: data.bankTime
    } })

    const queryClient = useQueryClient()
    //mutation 
    const {mutate}=useMutation({
        mutationFn: updateTimeSheet,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:['timeSheets']})
            queryClient.invalidateQueries({queryKey:['editTimeSheet', timeSheetId]})
            toast.success(data)
            navigate('/')
        }
    })
    //function handleSubmit
    const handleForm = (formData: TimeSheetFormData) => {
        const data ={
            formData,
            timeSheetId
        }
        mutate(data)
    }
    return (

        <>
            <nav className="my-5">
                <Link
                    className="bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] px-10 py-3 text-white text-xl font-OpenSans cursor-pointer transition-colors rounded-lg text-center items-center" to='/'> Return to Time Sheets
                </Link>
            </nav>
            <div className="text-center max-w-3xl mx-auto">

                <h1 className="text-5xl text-white text-center font-OpenSans"> EDIT TIME SHEET</h1>
                <br />
                <p className="text-2xl text-white font-ligth text-center font-OpenSans"> With the following form you can edit this Timesheet</p>
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
                        value='SAVE TIME SHEET'
                        className=" bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] w-full p-3 text-white font-OpenSans cursor-pointer transition-colors rounded-lg text-xl"
                    />
                </form>
            </div>

        </>
    )
}
