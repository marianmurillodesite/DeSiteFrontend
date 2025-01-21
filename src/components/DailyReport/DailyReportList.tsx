import { Fragment } from 'react'
import { DailyReport } from "@/types/index"
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import {useNavigate, useParams } from 'react-router-dom'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import { deleteDailyReport } from '@/api/DailyReportAPI'
import { toast } from 'react-toastify'
import { formatDate } from '@/utils/utils'

type DailyReportListProps={
    dailyReports : DailyReport[]
}

export default function DailyReportList({dailyReports}:DailyReportListProps) {
    const navigate = useNavigate()
    const params = useParams()
    const timeSheetId = params.timeSheetId!

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: deleteDailyReport,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:['timeSheet', timeSheetId]})
            toast.success(data)
            
        }
    })
  return (
      <>
          <div className="text-center">
              {dailyReports.length ? (<ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                  {dailyReports.map((dailyReport) => (
                      <li key={dailyReport._id} className="flex justify-between gap-x-6 px-5 py-10">
                          <div className="flex min-w-0 gap-x-4">
                              <div className="min-w-0 flex-auto space-y-2">
                                  <p className="text-sm text-gray-400">
                                      DESCRIPTION : {dailyReport.description}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                      CREATED AT : {formatDate(dailyReport.createdAt)}
                                  </p>
                                  <p className="text-sm text-gray-400">
                                      LAST UPDATE: {formatDate(dailyReport.updatedAt)}
                                  </p>
                              </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-x-6">
                              <Menu as="div" className="relative flex-none">
                                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                      <span className="sr-only">OPTIONS</span>
                                      <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                  </Menu.Button>
                                  <Transition as={Fragment} enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95">
                                      <Menu.Items
                                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                      >
                                          <Menu.Item>
                                              <button
                                                  type='button'
                                                  className='block px-3 py-1 text-sm leading-6 text-gray-900'
                                                  onClick={()=>navigate(location.pathname + `?editdailyReport=${dailyReport._id}`)}
                                              >

                                                  EDIT
                                              </button>
                                          </Menu.Item>
                                          <Menu.Item>
                                              <button
                                                  type='button'
                                                  className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                  onClick={() => mutate({timeSheetId, dailyReportId: dailyReport._id}) }
                                              >
                                                  DELETE
                                              </button>
                                          </Menu.Item>
                                      </Menu.Items>
                                  </Transition>
                              </Menu>
                          </div>
                      </li>
                  ))}
              </ul>) : (
                  <p className="text-center py-20"> There are no Time Sheets registered yet {''}

                  </p>
              )}
          </div>
      </>
  )
}
