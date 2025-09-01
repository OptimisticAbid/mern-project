const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true ,
    }, 
    longUrl: {
        type: String,
        required: true,
  },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
  }
});

module.exports = mongoose.model('Url', urlSchema);
