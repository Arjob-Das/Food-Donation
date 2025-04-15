import { Router } from 'express'
import User from '../models/user.js';
const router = Router();

router.get('/:userId', (req, res) => {
    User.findById(req.params.userId)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.put("/update", async (req, res) => {
    const { id, name, number, email } = req.body;

    try {
        // Find the user by ID and update the profile fields
        const user = await User.findByIdAndUpdate(id, { name, number, email }, { new: true });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the updated user object
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;

// import { Router } from 'express';
// import User from '../models/user.js';

// const router = Router();

// // Get user by ID
// router.get('/:userId', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user);
//     } catch (err) {
//         res.status(400).json({ error: 'Error fetching user: ' + err.message });
//     }
// });

// // Update user profile
// router.put('/update', async (req, res) => {
//     const { id, name, number, email } = req.body;

//     if (!id || !name || !number || !email) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             id,
//             { name, number, email },
//             { new: true, runValidators: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.json(updatedUser);
//     } catch (error) {
//         console.error('Update error:', error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// export default router;

