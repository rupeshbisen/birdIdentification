import mongoose from "mongoose";

const BirdSchema = new mongoose.Schema({
    fileUrl: String,
    fileName: String,
    imagesUrl: String,
}, { timestamps: true });

const Bird = mongoose.models.Bird || mongoose.model("Bird", BirdSchema);
export default Bird;