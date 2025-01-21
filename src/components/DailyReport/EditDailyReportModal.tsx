import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { DailyReport, DailyReportFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import DailyReportForm from './DailyReportForm';
import { updateDailyReport } from '@/api/DailyReportAPI';
import { toast } from 'react-toastify';

// function params 
type EditDailyReportModalProps = {
    data: DailyReport
    dailyReportId: DailyReport['_id']

}

export default function EditDailyReportModal({data, dailyReportId}: EditDailyReportModalProps) {
    const navigate = useNavigate()
    /**Get timeSheetID  */
    const params = useParams()
    const timeSheetId = params.timeSheetId!

     // components of react hook form
    const {register, handleSubmit,reset, formState:{errors}} = useForm<DailyReportFormData>({defaultValues:{
        description: data.description
    }})
    const queryClient = useQueryClient()
    // Mutation to edit 
    const {mutate} = useMutation({
        mutationFn: updateDailyReport,
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
    // handle function 
    const handleEditDailyReport = (formData:DailyReportFormData) =>{
        const data={
            timeSheetId,
            dailyReportId,
            formData
        }
        //make mutation 
        mutate(data)
    }
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace:true}) }>
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
                                    EDIT DAILY REPORT
                                </Dialog.Title>

                                <p className="text-xl font-bold">Make changes to a Daily Report in {''}
                                    <span className="text-fuchsia-600">this form</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditDailyReport)}
                                    noValidate
                                >
                    
                                    <DailyReportForm
                                        register={register}
                                        errors={errors}
                                    />
                    
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='SAVE DAILY REPORT'
                                        
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
