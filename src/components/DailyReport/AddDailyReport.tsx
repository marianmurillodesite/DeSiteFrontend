import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import {QueryClient, useMutation, useQueryClient} from '@tanstack/react-query'
import DailyReportForm from './DailyReportForm';
import { DailyReportFormData } from '@/types/index';
import { createDailyReport } from '@/api/DailyReportAPI';
import { toast } from 'react-toastify';

export default function AddDailyReport() {
    const navigate = useNavigate()
    /**Read modal exist */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalDailyReport = queryParams.get('newDailyReport')
    const show = modalDailyReport ? true : false;

    /**Get timeSheetID  */
    const params = useParams()
    const timeSheetId = params.timeSheetId!

    const initialValues : DailyReportFormData={
        description:''
    }
    const queryClient = useQueryClient()
    // define api function and get success messages  or error messages
    const {mutate} = useMutation({
        mutationFn:createDailyReport,
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:['editTimeSheet', timeSheetId]})
            toast.success(data)
            //reset form 
            reset()
            // close modal 
            navigate(location.pathname, {replace:true})
        }
    })

    // components of react hook form
    const {register, handleSubmit,reset, formState:{errors}} = useForm({defaultValues:initialValues})

    // function onSubmit form 
    const handleCreateDailyReport = (formData: DailyReportFormData) =>{
       const data ={
        formData,
        timeSheetId
       }
       // execute api function
       mutate(data)
    }
    return (
        // view of the Add Daily report Modal 
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace:true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        DAILY REPORT
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Fill out the form and create  {''}
                                        <span className="text-fuchsia-600">a Daily Report</span>
                                    </p>
                                   
                                    <form className='mt-10 space-y-3' onSubmit={handleSubmit(handleCreateDailyReport)} noValidate>
                                        <DailyReportForm 
                                            register={register}
                                            errors={errors}
                                        />
                                        <input
                                            type="submit"
                                            value='SAVE DAILY REPORT'
                                            className=" bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] w-full p-3 text-white font-OpenSans cursor-pointer transition-colors rounded-lg text-xl"
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
