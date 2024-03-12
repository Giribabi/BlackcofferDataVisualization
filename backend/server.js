const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dataRoutes = require("./routes/dataRoute");

console.log("your server console");
mongoose
    .connect(
        "mongodb+srv://sammidisaroja:uAAenD84MASLV0tR@cluster0.1o2hj1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
        console.log("successfully connected to mongodb");
    })
    .catch((error) => {
        console.log(
            "unable to connect to mongodb, try updating your ip address in mongodb connection or check your internet connection"
        );
        console.log(error);
    });

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json());
app.use("/", dataRoutes);

app.listen(3030);
