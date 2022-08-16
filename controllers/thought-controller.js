// bring in your models

// set up controllers

// get all thoughs
//thought.find

// get single though by id
// thought.findOnce

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