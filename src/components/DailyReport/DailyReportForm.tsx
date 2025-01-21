import { FieldErrors, UseFormRegister } from "react-hook-form"
import { DailyReportFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type DailyReportFormProps = {
    errors: FieldErrors<DailyReportFormData>
    register: UseFormRegister<DailyReportFormData>
}
export default function DailyReportForm({errors, register} : DailyReportFormProps) {
  return (
        <>
            
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >DAILY REPORT DESCRIPTION :</label>
                <textarea
                    id="description"
                    placeholder="Daily report Description"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "The description is required"
                    })}
                />
                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
