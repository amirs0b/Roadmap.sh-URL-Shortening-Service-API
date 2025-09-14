import mongoose from 'mongoose';
const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: [true,"Orginal URL is required"]
    },
    shortUrl: {
        type: String,
        required: [true,"Short URL is required"],
        unique: [true,"Short URL must be unique"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,"User ID is required"]
    },
    urlClicks: {
        type: Number,
        default: 0
    }},{
    timestamps: true
});
const UrlMd = mongoose.model('Url', urlSchema);
export default UrlMd;


