import mongoose from "mongoose";

export const homeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

const Home =  mongoose.model("home", homeSchema)

export default Home
