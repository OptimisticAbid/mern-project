const asyncHandler = require('express-async-handler')

const Url = require('../models/urlModel')
const User = require('../models/userModel')

const { nanoid } = require("nanoid"); 
const baseUrl = process.env.BASE_URL;

const getUrl = asyncHandler(async (req,res) => {
    const urls = await Url.find({user: req.user.id})
    res.status(200).json(urls);
})

const postUrl = asyncHandler(async (req, res) => {
  const {longUrl} = req.body;

  if (!longUrl) {
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
      user: req.user.id,
      longUrl,
      shortUrl: shortCode,
    });

    res.status(201).json({
      message: "URL shortened successfully",
      longUrl: newUrl.longUrl,
      shortUrl: `${baseUrl}/${newUrl.shortUrl}`
    });
});


const updateUrl = asyncHandler(async (req,res) => {
    const url = await Url.findById(req.params.id)
    
    if(!url) {
        res.status(400)
        throw new error('URL Not Found!')
    }

    const user = await User.findById(req.user.id)

    // Check for User
    if(!user) {
      res.status(401)
      throw new Error('User not found')
    }

    // Make sure the loggedin user ,atches the url user
    if(url.user.toString() != user.id) {
      res.status(401)
      throw new Error('User not authorized')
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

     const user = await User.findById(req.user.id)

    // Check for User
    if(!user) {
      res.status(401)
      throw new Error('User not found')
    }

    // Make sure the loggedin user ,atches the url user
    if(url.user.toString() != user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
    await url.deleteOne()
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getUrl ,
    postUrl,
    updateUrl,
    deleteUrl
}