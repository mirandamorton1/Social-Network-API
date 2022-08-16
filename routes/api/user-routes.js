// router from express
const router = require('express').Router();

const {
// all of your user controllers
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

} = require('../../controllers/user-controller') // required from controllers

// set up routes
router.route('/').get(getUsers).post(createUser);

// api/users/:userId - activity 23
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

//export
module.exports = router;

