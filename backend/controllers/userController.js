import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import {db}from '../db/index.js'
import {users} from '../drizzle/schema.js'
import { eq } from 'drizzle-orm'

// @desc    Register a new User
// @route   POST api/v1/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    if(!name || !email || !password){
        res.status(400) 
        throw new Error("Please add all fields")
    }
    console.log(req.body);
    
    // check if user exists
    const [userExists] = await db.select().from(users).where(eq(users.email,email))
    
    if(userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    
    // Create user 
    const [user] = await db.insert(users).values({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        console.log("Success");
        
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

// @desc    Authenticate a  User
// @route   POST api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const [user] = await db.select().from(users).where(eq(users.email, email))

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @desc    Get User details
// @route   GET api/users/me
// @access  Private
const userData = asyncHandler(async (req, res) => {
    const [user] = await db.select(
        { 
            id: users.id,
            username: users.username,
            email : users.email

        })
        .from(users).
    where(eq(users.id, req.user.id))
 
    res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email
  });
});

// Generate a JWT
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

export { registerUser, loginUser, userData }

