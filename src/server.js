import express from "express";
import cors from "cors";
import routers from "./routers";

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(routers);

const port =process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`http://localhost:${port}`)
});