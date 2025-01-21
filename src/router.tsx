import {BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardView from '@/views/DashboardView'
import CreateTimeSheetView from './views/TimeSheets/CreateTimeSheetView'
import EditTimeSheetView from './views/TimeSheets/EditTimeSheetView'
import TimeSheetDetailsView from './views/TimeSheets/TimeSheetDetailsView'
import AuthLayout from './layouts/AuthLayout'
import LoginView from './views/auth/LoginView'
import RegisterView from './views/auth/RegisterView'
import ConfirmAccountView from './views/auth/ConfirmAccountView'
import RequestNewCodeView from './views/auth/RequestNewCodeView'
import ForgotPasswordView from './views/auth/ForgotPasswordView'
import NewPasswordView from './views/auth/NewPasswordView'

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path='/' element={<DashboardView/>} index />
                    <Route path='/TimeSheets/create' element={<CreateTimeSheetView/>} />
                    <Route path='/TimeSheets/:timeSheetId' element={<TimeSheetDetailsView/>} />
                    <Route path='/TimeSheets/:timeSheetId/edit' element={<EditTimeSheetView/>} />
                    
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView/>} />
                    <Route path='/auth/register' element={<RegisterView/>} />
                    <Route path='/auth/confirm-account' element={<ConfirmAccountView/>} />
                    <Route path='/auth/request-code' element={<RequestNewCodeView/>} />
                    <Route path='/auth/forgot-password' element={<ForgotPasswordView/>} />
                    <Route path='/auth/new-password' element={<NewPasswordView/>} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}