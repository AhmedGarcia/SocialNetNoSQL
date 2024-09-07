const { Thought, User } = require('../models');

//Thought controller
module.exports = {
    //GET all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET a single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID! '});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //POST to create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            //Add thought to associated user's thoughts array
            await User.findByIdAndUpdate(
                req.body.userId,
                { $push: { thoughts: thought._id } },
                { new: true}
            );

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //PUT to update a thought by _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                req.body,
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE to remove a thought by _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }

            //Remove thought from user's thoughts array
            await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //POST to add a reaction
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } }, //Avoids duplicate reactions
                { new: true, runValidators: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'Nothought with this ID!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE to remove a reaction by reactionId
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId:req.params.reactionId} } }, //Removes a specific reaction
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this ID!' });
            }

            res.json({ message: 'Reaction deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};