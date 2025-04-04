import { Router } from "express";
import { addScheduleTemplate, addStation, addTrain, addTrip } from "../admin/add.admin.js"

const adminRouter = Router()

adminRouter.post('/addStation', addStation)
adminRouter.post('/addTrain', addTrain)
adminRouter.post('/addSchedule', addScheduleTemplate)
adminRouter.post('/addTrip', addTrip)

export default adminRouter