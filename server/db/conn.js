const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://PRAVAS:fqgUQCpUqMc1rTod@cluster0.pzmvbd9.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Connected")
}).catch((err) => {
    console.log("Not Running")
})