const router = require('express').Router();
const { User } = require('../Models/user');
const bcrypt = require('bcrypt');

router.put('/', async (req, res) => {
    const { userId } = req.query;
    const { firstName, lastName, email, phone, password } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', userId: userId });
        }

        // Check if the email is being updated and already exists
        if (email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && String(existingUser._id) !== userId) {
                return res.status(400).json({ message: 'Email is already in use by another user' });
            }
        }

        // Create an updates object
        const updates = { firstName, lastName, email, phone };

        // If the password is provided, hash it and update
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        // Perform the update
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        // Return the updated user
        res.status(200).json({ updatedUser, message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'Error updating user details' });
    }
});

module.exports = router;
