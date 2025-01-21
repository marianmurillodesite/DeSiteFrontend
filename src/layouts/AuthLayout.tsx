
import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
export default function AuthLayout() {
  return (
    <>
        <div>
            <div>
                <div>
                    
                    <Outlet />
                </div>
            </div>
        </div>
        <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
        />
    </>
  )
}
