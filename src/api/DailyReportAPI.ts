import {isAxiosError} from 'axios';
import api from "@/lib/axios";
import { DailyReport, DailyReportFormData, TimeSheet } from "../types";

type DailyReportAPI = {
    formData: DailyReportFormData
    timeSheetId: TimeSheet['_id']
    dailyReportId: DailyReport['_id']
}
export async function createDailyReport({formData, timeSheetId}: Pick<DailyReportAPI, 'formData'|'timeSheetId'>) {
    try{
        const url = `/timesheets/${timeSheetId}/dailyReports`
        const {data} = await api.post<string>(url,formData)
        return data
    }catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getDailyReportById({timeSheetId, dailyReportId}: Pick<DailyReportAPI,'timeSheetId'| 'dailyReportId'>) {
    try {
        const url = `/timesheets/${timeSheetId}/dailyReports/${dailyReportId}`
        const {data} = await api(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateDailyReport({timeSheetId, dailyReportId, formData}: Pick<DailyReportAPI,'timeSheetId'| 'dailyReportId' | 'formData'>) {
    try {
        const url = `/timesheets/${timeSheetId}/dailyReports/${dailyReportId}`
        const {data} = await api.put<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteDailyReport({timeSheetId, dailyReportId}: Pick<DailyReportAPI,'timeSheetId'| 'dailyReportId'>) {
    try {
        const url = `/timesheets/${timeSheetId}/dailyReports/${dailyReportId}`
        const {data} = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}