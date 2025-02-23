const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { createUser, findUserByEmail } = require('../models/User');

dotenv.config();

function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (await findUserByEmail(email)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const user = await createUser(name, email, password);
    res.json({ message: 'User registered successfully', user });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ message: 'Login successful', token });
};
