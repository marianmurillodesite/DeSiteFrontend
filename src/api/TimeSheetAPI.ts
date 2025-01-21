import api from "@/lib/axios";
import { dashboardTimeSheetSchema, TimeSheet, TimeSheetFormData } from "@/types/index";
import { isAxiosError } from "axios";


export async function createTimeSheet(formData:TimeSheetFormData) {
    console.log(formData)
    try {
        const { data } = await api.post('/timesheets',formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        
    }
}

export async function getTimeSheets() {
   
    try {
        const {data} = await api('/timesheets')
        const response = dashboardTimeSheetSchema.safeParse(data)
        if(response.success){
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        
    }
}

export async function getTimeSheetById(id: TimeSheet['_id']) {
   
    try {
        const {data} = await api(`/timesheets/${id}`)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        
    }
}

type timeSheetAPIType={
    formData: TimeSheetFormData,
    timeSheetId: TimeSheet['_id']
}
export async function updateTimeSheet({formData, timeSheetId}:timeSheetAPIType) {
   
    try {
        const {data} = await api.put<string>(`/timesheets/${timeSheetId}`,formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        
    }
}