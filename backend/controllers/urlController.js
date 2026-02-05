import asyncHandler from 'express-async-handler'
import { urls, users } from '../drizzle/schema.js'
import { db } from '../db/index.js'
import { eq } from 'drizzle-orm'

import { nanoid } from 'nanoid'
const baseUrl = process.env.BASE_URL

// @desc    Get user URLs
// @route   POST api/urls/
// @access  Private
const getUrl = asyncHandler(async (req, res) => {
    // const url = await urls.find({user: req.user.id})
  const [allUrls]= await db.select().from(urls).where(eq(req.user.id,users.id))
  if(!allUrls) {
    res.status(404)
    throw new Error("Not found!")
  }
  res.status(200).json( 
    allUrls.map((url) => ({
      ...url.toObject(),
      shortUrl: url.shortUrl,
      fullShortUrl: `${baseUrl}/${url.shortUrl}`,
    }))
 )
})

// @desc    Shorten a new URL
// @route   POST api/urls/
// @access  Public
const postUrl = asyncHandler(async (req, res) => {
    const { longUrl } = req.body

    if (!longUrl) {
        res.status(400)
        throw new Error('Please add a URL')
    }

    let [ existing ]= await db.select().from(urls).where(eq(urls.longUrl,longUrl)) 
    if (existing) {
        return res.status(200).json({
            message: 'URL already shortened',
            longUrl: existing.longUrl,
            shortUrl: `${baseUrl}/${existing.shortUrl}`,
            createdAt: existing.createdAt,
        })
    }

    const shortCode = nanoid(7)

    const newUrl = await db.insert(urls).values({
        user: req.user.id,
        longUrl,
        shortUrl: shortCode,
    })

    res.status(201).json({
        message: 'URL shortened successfully',
        longUrl: newUrl.longUrl,
        shortUrl: shortCode,
        fullShortUrl: `${baseUrl}/${shortCode}`,
    })
})

// @desc    Register a new User
// @route   POST api/users
// @access  Public
const updateUrl = asyncHandler(async (req, res) => {
  const [url] = await db.select().from(urls).where(eq(req.params.id,urls.id))

  if (!url) {
    res.status(400)
    throw new Error('URL Not Found!')
  }

  const [user] = await db.select().from(users).where(eq(req.user.id,user.id))

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (url.user.toString() != user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedUrl = await Url.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedUrl)
})

// @desc    Register a new User
// @route   POST api/users/id
// @access  Public
const deleteUrl = asyncHandler(async (req, res) => {
  const url = await Url.findById(req.params.id)

  if (!url) {
    res.status(400)
    throw new Error('URL Not Found!')
  }

  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (url.user.toString() != user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await url.deleteOne()
  res.status(200).json({ id: req.params.id })
})

export { getUrl, postUrl, updateUrl, deleteUrl }