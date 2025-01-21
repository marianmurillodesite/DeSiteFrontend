import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

export default function NavMenu() {

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-[#0A327C]">
        <Bars3Icon className='w-8 h-8 text-white ' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-64 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <p className='text-center font-medium mb-6 text-2xl'>GENERAL</p>
            <Link
              to='/profile'
              className='mr-2 text-lg font-semibold block p-2 hover:text-white hover:bg-[#0A327C]'
            >TIME SHEETS</Link>
            <br/>
            <br/>
            <p className='text-center font-medium mb-6 text-2xl'>ADMIN</p>
            <Link
              to='/'
              className='mr-2 text-lg font-semibold block p-2 hover:text-white hover:bg-[#0A327C]'
            >USERS</Link>
            <button
              className='mr-2 text-lg font-semibold block w-full p-2 hover:text-white hover:bg-[#0A327C] text-left'
              type='button'
              onClick={() => { }}
            >
             LOGOUT
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}