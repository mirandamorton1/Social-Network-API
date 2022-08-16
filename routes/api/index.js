// bring in router from express
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// bring in routes

// set up routes using router.use
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export
module.exports = router;