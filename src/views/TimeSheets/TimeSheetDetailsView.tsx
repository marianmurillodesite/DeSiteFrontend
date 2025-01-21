import { Navigate, useNavigate, useParams } from "react-router-dom"
import {useQuery} from '@tanstack/react-query'
import { getTimeSheetById } from "@/api/TimeSheetAPI"
import AddDailyReport from "@/components/DailyReport/AddDailyReport"
import DailyReportList from "@/components/DailyReport/DailyReportList"
import EditDailyReportData from "@/components/DailyReport/EditDailyReportData"


export default function TimeSheetDetailsView() {
    const navigate = useNavigate()
    const params = useParams()
    const timeSheetId = params.timeSheetId!
 
    const { data, isLoading, isError} = useQuery({
        queryKey: ['timeSheet', timeSheetId],
        queryFn: () => getTimeSheetById(timeSheetId),
        retry: false
    })

    if(isLoading) return 'Loading data wait...'
    if(isError) return <Navigate to='/404'/>
  
    if(data) return (
        <>
            <h1 className="text-5xl font-OpenSans">TIME SHEET : {data.date}</h1>
            <p className="text-2xl font-OpenSans text-gray-500 mt-5">{data.totalHours}</p>
            <nav className="my-5 flex gap-3">
                <button
                    type="button"
                    className="bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] px-10 py-3 text-white text-xl font-OpenSans cursor-pointer transition-colors"
                    onClick={()=> navigate(location.pathname + '?newDailyReport=true')}
                >ADD DAILY REPORT</button>

            </nav>
            
            <p className="text-2xl font-OpenSans text-gray-500 mt-5">DAILY REPORTS</p>
            <DailyReportList
                dailyReports={data.dailyreports}
            />

            <AddDailyReport />

            <EditDailyReportData />
        </>
    )
}
