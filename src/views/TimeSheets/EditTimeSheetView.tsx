import { Navigate, useParams } from "react-router-dom"
import {useQuery} from '@tanstack/react-query'
import { getTimeSheetById } from "@/api/TimeSheetAPI"
import EditTimeSheetForm from "@/components/TimeSheets/EditTimeSheetForm"

export default function EditTimeSheetView() {
    const params = useParams()
    const timeSheetId = params.timeSheetId!
 
    const { data, isLoading, isError} = useQuery({
        queryKey: ['editTimeSheet', timeSheetId],
        queryFn: () => getTimeSheetById(timeSheetId),
        retry: false
    })

    if(isLoading) return 'Loading data wait...'
    if(isError) return <Navigate to='/404'/>
  
    if(data) return <EditTimeSheetForm data={data} timeSheetId={timeSheetId}/>
}
