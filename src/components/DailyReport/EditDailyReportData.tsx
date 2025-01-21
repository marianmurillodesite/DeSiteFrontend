import { Navigate, useLocation, useParams } from "react-router-dom"
import {useQuery} from '@tanstack/react-query'
import { getDailyReportById } from "@/api/DailyReportAPI"
import EditDailyReportModal from "./EditDailyReportModal"

export default function EditDailyReportData() {
    // get TimeSheet ID 
    const params= useParams()
    const timeSheetId = params.timeSheetId!
    //get daily report id from url 
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const dailyReportId = queryParams.get('editdailyReport')!

    const {data, isError} = useQuery({
        queryKey:['dailyReport', dailyReportId],
        queryFn:()=>getDailyReportById({timeSheetId,dailyReportId}),
        //true or false exist this param, before connect API 
        enabled: !!dailyReportId,
    })
    // url error 
    if(isError) return <Navigate to={'/404'}/>
    // return modal if exist a dailyModalID
    if(data) return <EditDailyReportModal data={data} dailyReportId={dailyReportId}/>
}
