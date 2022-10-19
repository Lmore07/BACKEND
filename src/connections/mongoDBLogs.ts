import mongoose from "mongoose";
import {MONGODB_URI} from "../globals/configuration/environment"

mongoose.connect(MONGODB_URI)
.then(db => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log(err);
})

