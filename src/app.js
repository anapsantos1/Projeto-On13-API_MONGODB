const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/pets", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection


db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function () {
    console.log("conexão feita com sucesso.")
})

const app = express()


const index = require("./routes/index")
const pets = require("./routes/pets")

app.use(express.json());


app.use("/", index)
app.use("/pets", pets)

module.exports = app