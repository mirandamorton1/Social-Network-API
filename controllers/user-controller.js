//bring i your models
const { User, Thought } = require("../models");

module.exports = {
    getUsers(req, res) {
        User.find({})
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate("friends")
            .populate("thoughts")
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No user found with this ID" })
                    :res.json(user)
                )
                .catch((err) => res.status(500))
    },
    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No User found with this ID!" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No User find with this ID!" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      //delete a friend
      deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }
        )
          .then(
            (user) =>
              !user
                ? res.status(404).json({ message: "No User find with this ID!" })
                : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No User find with this ID!" })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: "User and Thought deleted!" }))
          .catch((err) => res.status(500).json(err));
      },
    
}

// set up your controllers

//get all users
//user.find
//activity 13 in server.js -reference

//get single user by id
// user.findOne
// populate 'friends' - to get friend data
// populate 'thoughts' = to get thought data

// create a new user
// user.create

// update a user
// user.findOneAndupdate
// $set - set the req.body

// add friend to friend list
// user.findOneAndUpdate
// $addtoSet - to add the new friend to the users friend list

// remove freind from friend list
//user.findOneAndUpdate

//export usrController