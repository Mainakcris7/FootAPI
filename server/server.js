require("dotenv").config()
const express = require("express")
const connectToDB = require("./utils/connectDB")

const authRouter = require("./routers/authRouter")
const userRouter = require("./routers/userRouter")
const apiRouter = require("./routers/apiRouter")
const contactRouter = require("./routers/contactRouter")

const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//* CORS
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true

}
app.use(cors(corsOptions))
//*

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/api", apiRouter)
app.use("/contact", contactRouter)

app.get("/", (req, res) => {
    res.status(200).json({ "message": "Index route" })
})

// Error handling route
app.use((err, req, res, next) => {
    statusCode = err.status || 400;
    message = err.message || "Something went wrong!"
    res.status(400).json({ error: { message, statusCode } })
})


connectToDB()
    .then(msg => console.log(msg))
    .catch(errMsg => console.log(errMsg))

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})