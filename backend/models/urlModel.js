import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        longUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Url', urlSchema)
