import express from "express";
import cors from "cors";
import db from "./src/config/database.js";
import router from "./src/routes/route.js";
import cookieParser from "cookie-parser";
import users from "./src/models/users.js";
import jurnals from "./src/models/jurnal.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
try {
    db.authenticate();
    // users.sync();
    // jurnals.sync();
    console.log("success connect database");
} catch (error) {
    console.log(error);
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);

app.listen(5000, () => console.log("run in port 5000"));
