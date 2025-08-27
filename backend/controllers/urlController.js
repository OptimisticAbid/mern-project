const asyncHandler = require('express-async-handler')
const Url = require('../models/urlModel')
const { nanoid } = require("nanoid"); 
const baseUrl = process.env.BASE_URL;

const getUrl = asyncHandler(async (req,res) => {
    const urls = await Url.find()
    res.json(urls);
})

const postUrl = asyncHandler(async (req, res) => {
  const url = req.body?.url;

  if (!url) {
    res.status(400);
    throw new Error("Please add a URL");
  }

    let existing = await Url.findOne({ longUrl });
    if (existing) {
      return res.status(200).json({
        message: "URL already shortened",
        longUrl: existing.longUrl,
        shortUrl: `${baseUrl}/${existing.shortUrl}`,
      });
    }

    const shortCode = nanoid(7);

    const newUrl = await Url.create({
      longUrl,
      shortUrl: shortCode,
    });

    res.status(201).json({
      message: "URL shortened successfully",
      longUrl: newUrl.longUrl,
      shortUrl: `${baseUrl}/${newUrl.shortUrl}`
    });
});


const patchUrl = asyncHandler(async (req,res) => {
    const url = await Url.findById(req.params.id)
    
    if(!url) {
        res.status(400)
        throw new error('URL Not Found!')
    }

    const updatedUrl = await Url.findByIdAndUpdate(req.params.id,req.body,{
        new: true, 
    })
    res.status(200).json(updatedUrl);
})

const deleteUrl = asyncHandler(async (req,res) => {
    const url = await Url.findById(req.params.id)

    if(!url) {
        res.status(400)
        throw new error('URL Not Found!')
    }

    await url.deleteOne()
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getUrl ,
    postUrl,
    patchUrl,
    deleteUrl
}