import {UseFormRegister, FieldErrors} from 'react-hook-form'
import ErrorMessage from "../ErrorMessage";
import { TimeSheetFormData } from 'types';

type TimeSheetFormProps = {
    register: UseFormRegister<TimeSheetFormData>
    errors:FieldErrors<TimeSheetFormData>
}
export default function TimeSheetForm({errors, register}: TimeSheetFormProps){
    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="mb-5 space-y-3 text-left">
                <label htmlFor="date" className="text-2xl text-[#0A327C]  font-OpenSans">
                    DATE:
                </label>
                <input
                    id="date"
                    className="w-full p-3 border border-gray-200"
                    type="date"
                    {...register("date", {
                        required: "DATE IS REQUIRED",
                    })}
                />
                {errors.date && (
                    <ErrorMessage>{errors.date.message}</ErrorMessage>
                )}
            </div>
    
            <div className="mb-5 space-y-3 text-left">
                <label htmlFor="checkInTime" className="text-2xl text-[#0A327C] font-OpenSans">
                    CHECK IN TIME:
                </label>
                <input
                    id="checkInTime"
                    className="w-full p-3 border border-gray-200"
                    type="time"
                    {...register("checkInTime", {
                        required: "CHECK IN TIME IS REQUIRED",
                    })}
                />
                {errors.checkInTime && (
                    <ErrorMessage>{errors.checkInTime.message}</ErrorMessage>
                )}
            </div>
    
            <div className="mb-5 space-y-3 text-left">
                <label htmlFor="lunchTimeStart" className="text-2xl text-[#0A327C] font-OpenSans">
                    LUNCH TIME START:
                </label>
                <input
                    id="lunchTimeStart"
                    className="w-full p-3 border border-gray-200"
                    type="time"
                    {...register("lunchTimeStart", {})}
                />
                {errors.lunchTimeStart && (
                    <ErrorMessage>{errors.lunchTimeStart.message}</ErrorMessage>
                )}
            </div>
    
            <div className="mb-5 space-y-3 text-left">
                <label htmlFor="lunchTimeEnd" className="text-2xl text-[#0A327C] font-OpenSans">
                    LUNCH TIME END:
                </label>
                <input
                    id="lunchTimeEnd"
                    className="w-full p-3 border border-gray-200"
                    type="time"
                    {...register("lunchTimeEnd", {})}
                />
                {errors.lunchTimeEnd && (
                    <ErrorMessage>{errors.lunchTimeEnd.message}</ErrorMessage>
                )}
            </div>
    
            <div className="mb-5 space-y-3 text-left">
                <label htmlFor="departureTime" className="text-2xl text-[#0A327C]  font-OpenSans">
                    DEPARTURE TIME:
                </label>
                <input
                    id="departureTime"
                    className="w-full p-3 border border-gray-200"
                    type="time"
                    {...register("departureTime", {
                        required: "DEPARTURE TIME IS REQUIRED",
                    })}
                />
                {errors.departureTime && (
                    <ErrorMessage>{errors.departureTime.message}</ErrorMessage>
                )}
            </div>
    
            <div className="mb-5 space-y-3 text-left">
                <label htmlFor="totalHours" className="text-2xl text-[#0A327C]  font-OpenSans">
                    TOTAL HOURS:
                </label>
                <input
                    id="totalHours"
                    className="w-full p-3 border border-gray-200"
                    type="number"
                    readOnly
                    {...register("totalHours", {})}
                />
                {errors.totalHours && (
                    <ErrorMessage>{errors.totalHours.message}</ErrorMessage>
                )}
            </div>
    
            <div className="mb-5 space-y-3 text-left">
                <label htmlFor="bankTime" className="text-2xl text-[#0A327C] font-OpenSans">
                    BANK TIME:
                </label>
                <input
                    id="bankTime"
                    className="w-full p-3 border border-gray-200"
                    type="number"
                    readOnly
                    {...register("bankTime", {})}
                />
                {errors.bankTime && (
                    <ErrorMessage>{errors.bankTime.message}</ErrorMessage>
                )}
            </div>
        </div>
    )

}