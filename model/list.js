import mongoose from "mongoose"
import { homeSchema } from "./home.js"

const listSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    lists: {
        type: [homeSchema]
    }
})

const CustomList =  mongoose.model("CustomList", listSchema)

export default CustomList