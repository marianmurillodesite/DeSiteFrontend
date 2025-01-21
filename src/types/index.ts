import {z} from 'zod'
/** Auth and users  */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token:z.string()
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth,'email'|'password'>
export type UserRegistrationForm = Pick<Auth,'name'|'email'|'password'| 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth,'email'>
export type ForgotPasswordForm = Pick<Auth,'email'>
export type NewPasswordForm = Pick<Auth,'password'| 'password_confirmation'>
export type ConfirmToken  = Pick<Auth,'token'>

/** Daily Report schema */

export const dailyReportSchema = z.object({
    _id: z.string(),
    description:z.string(),
    timeSheet:z.string(),
    createdAt:z.string(),
    updatedAt:z.string()
})

export type DailyReport = z.infer<typeof dailyReportSchema>
export type DailyReportFormData = Pick<DailyReport,'description'>



/** Time Sheets schemas */
export const timeSheetSchema = z.object({
    _id: z.string(),
    date: z.date(),
    checkInTime: z.string(),
    lunchTimeStart: z.string(),
    lunchTimeEnd: z.string(),
    departureTime: z.string(),
    totalHours: z.number(),
    bankTime: z.number()
})



export const dashboardTimeSheetSchema = z.array(
    timeSheetSchema.pick({
        _id: true,
        date: true,
        checkInTime:true,
        lunchTimeStart: true,
        lunchTimeEnd: true,
        departureTime: true,
        totalHours: true,
        bankTime: true
    })
)
export type TimeSheet = z.infer< typeof timeSheetSchema>
export type TimeSheetFormData = Pick<TimeSheet,'date' | 'checkInTime' | 'lunchTimeStart' | 'lunchTimeEnd' | 'departureTime' | 'totalHours' | 'bankTime'>