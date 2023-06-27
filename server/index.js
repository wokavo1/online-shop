const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const adminRouter = require("./routes/adminRouter");
const defaultRouter = require("./routes/defaultRouter");
const { PORT, DB_CONNECTION_URL } = require("./config");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", ["*"]);
    res.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.set("Access-Control-Allow-Headers", ["Content-Type", "Authorization"]);
    next();
});
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/", defaultRouter);

const start = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_URL);
        app.listen(PORT, () => {
            console.log("server started on port " + PORT);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
