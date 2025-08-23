const asyncHandler = require('express-async-handler')


const getUrl = asyncHandler(async (req,res) => {
    res.send("this is a get req");
})
const postUrl = asyncHandler(async (req,res) => {
    const orgUrl = req.body?.url ;
    if(!orgUrl) {
        res.status(400)
        throw new Error("Please add a URL")
    }
    
    res.send(`this is a post req for ${orgUrl}`);
})

const patchUrl = asyncHandler(async (req,res) => {
    res.send("this is a patch req");
})

const deleteUrl = asyncHandler(async (req,res) => {
    res.send("this is a delete req");
})

module.exports = {
    getUrl ,
    postUrl,
    patchUrl,
    deleteUrl
}