import { Router } from "express"
import searchTripAvailability from "../controllers/search.controller.js";

const searchRouter = Router()

searchRouter.post('/availability', searchTripAvailability)

export default searchRouter;