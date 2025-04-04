import express from "express"
import cookieParser from "cookie-parser"

import searchRouter from "./routes/availability.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/search', searchRouter)

app.get('/', (req, res) => { res.send("\nWelcome to Modern Train Booking System")})

app.listen(port, () => {
    console.log(`\nModern Booking System running on http://localhost:${port}`)
})