import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom"
import { useQuery } from '@tanstack/react-query'
import { getTimeSheets } from "@/api/TimeSheetAPI"
export default function DashboardView() {
    const { data, isLoading } = useQuery({
        queryKey: ['timeSheets'],
        queryFn: getTimeSheets,
    })

    if (isLoading) return 'Loading data wait...'
    
    if (data) return (
        <>
            <div className="text-center">
                <h1 className="text-5xl text-white  font-OpenSans"> MY TIMESHEETS</h1>
                <br />
                <p className="text-2xl text-white font-ligth  font-OpenSans"> Manage your Time Sheets in real time</p>

                <nav className="my-5">
                    <Link
                        className="bg-[#196DBB] hover:bg-gray-200 hover:text-[#0A327C] px-10 py-3 text-white text-xl font-OpenSans cursor-pointer transition-colors rounded-lg text-center items-center" to='/TimeSheets/create'> ADD NEW TIME SHEET
                    </Link>
                </nav>

                {data.length ? (<ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data.map((timeSheet) => (
                        <li key={timeSheet._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <Link to={`/TimeSheets/${timeSheet._id}`}
                                        className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                                    >{timeSheet.date.getDate()}</Link>
                                    <p className="text-sm text-gray-400">
                                        ID: {timeSheet._id}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        CHECK IN TIME: {timeSheet.checkInTime}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        DEPARTURE IN TIME: {timeSheet.departureTime}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        TOTAL HOURS: {timeSheet.totalHours}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        BANK TIME: {timeSheet.bankTime}
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
                                                <Link to={`/TimeSheets/${timeSheet._id}`}
                                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                    DETAILS
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link to={`/TimeSheets/${timeSheet._id}/edit`}
                                                    className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                    EDIT TIME SHEET 
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                    onClick={() => { }}
                                                >
                                                    DELETE TIME SHEET
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
                        <Link to='/TimeSheets/create' className="text-[#0A327C]">
                            CREATE TIME SHEET</Link>

                    </p>
                )}
            </div>


        </>
    )
}
