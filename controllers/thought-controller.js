// bring in your models
const { User, Thought } = require("../models");

// set up controllers
module.exports = {
    //get all thoughts
    //thought.find
    getThought(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    // get single thought by id
    // thought.findOne
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with taht ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thought: thought._id } },
                    { new: true }
                );
            })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought found with this ID',
            })
            : res.json('Created the thought')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateThought(req, res) {
        Thought.fineOneAndUpdate(
            { _id: req.params.videoId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    : res.json(thought)
                )
                .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id:req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID' })
                    : User.findOneAndUpdate(
                        { thought: req.params.thoughtId },
                        { $pull: { thought: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) => 
            !user
                ? res.status(404)
                .json({ message: 'Thought deleted but no user with this id!' })
                : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runvalidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought found with this ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};




//create a though
//Thought.creat

//update a thought
// though.findOnceAndUpdate

//delete a though - also need to do a findOneAndUpdate on the uer to remove the thought from the uers throughts array
// though.finoneAndRemove
//also need User.findOnceAndUpdate - use $pull to pull the thought from users thought's array

// add a reaction to a though
// thought.findOneAndUpdate
// use $addToSet

// remove reaction from a though
// thought.findOnceAndUpdate
// use $pull to pull reaction from thoughts reaction array

//export your thoughtController