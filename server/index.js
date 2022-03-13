const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const app = express()
const PORT = config.get("serverPort")

app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("dbUrl"))
        .finally(console.log('connected to db'))
        app.listen(PORT, () => {
            console.log(`Port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()