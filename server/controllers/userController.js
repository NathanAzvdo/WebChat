const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({ _id }, jwtkey, { expiresIn: '3d' });
};

const registerUser = async function (req, res) {
    try {
        const { name, email, password } = req.body;
        
        // Check if user with the same email already exists
        let existingUser = await User.findOne({ email: email });
        console.log("Existing User:", existingUser); 
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists!' });
        }
        
        // Validate input fields
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required!' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Email must be a valid email!' });
        }
        if (validator.isStrongPassword(password)) {
            return res.status(400).json({ error: 'Password must be a strong password!' });
        }

        // Create a new user instance
        const newUser = new User({ name, email, password });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        // Save the new user to the database
        await newUser.save();

        // Create JWT token
        const token = createToken(newUser._id);

        // Respond with user data and token
        res.status(200).json({ _id: newUser._id, name, email, token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { registerUser };
