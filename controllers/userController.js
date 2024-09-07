const { User, Thought } = require('../models');

// User controller
module.exports = {
    //GET all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
              .populate('thoughts')
              .populate('friends');
            res.json(users);  
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET a single user by _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //PUT to update a user by _id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this ID!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE to remove a user by _id and associated thoughts 
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this ID!' });
            }

            //remove associated thoughts
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //POST to add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId} }, //Avoid duplicates
                { new: true }

            ).populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json({ message: 'No user with that ID!' });
        }
    },

    //DELETE to remove a friend
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId} }, //Remove the friendId from friends array
                { new: true }
            ).populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'Nouser with that ID!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },


};