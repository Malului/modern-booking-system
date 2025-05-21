import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

import searchRouter from "./routes/availability.routes.js";
import adminRouter from "./routes/admin.routes.js";
import bookingRouter from "./routes/booking.routes.js";

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/search', searchRouter)
app.use('/api/v1/booking', bookingRouter)

app.get('/', (req, res) => { res.send("\nWelcome to Modern Train Booking System")})

app.listen(port, () => {
    console.log(`\nModern Booking System running on http://localhost:${port}`)
})