import { Router } from "express";

import booking from "../controllers/booking.controller.js";

const bookingRouter = Router();

bookingRouter.post('/details', booking)

export default bookingRouter;