const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const bcrypt = require('bcrypt')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Internal Server Error");
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        }).status(201)
    } else {
        res.status(400);
        throw new Error("Internal Server Error");
    }
})

const fetchUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.status(201).json(users);
})

const changePassword = async (req, res) => {
    const { id, password, newPassword } = req.body;
    if (!id || !newPassword) {
        res.status(400);
        throw new Error("Please provide both id and newPassword");
    }

    const user1 = await User.findOne({ _id: id });

    if (user1 && (await user1.matchPassword(password))) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(500);
            console.log("Error")
        }
    } else {
        res.json({ message: "Password not matched" }).status(401);
    }
};

const updateProfile = asyncHandler(async (req, res) => {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    try {
        const user = await User.findByIdAndUpdate(id, { name: name, email: email }, { new: true });
        if (user) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(500);
            console.log("Error")
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = { registerUser, fetchUsers, authUser, changePassword, updateProfile };