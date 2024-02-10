import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
    videoId:String,
    thumbnail:String,
    title:String,
    description:String,
    channel:String
})

export default HistorySchema