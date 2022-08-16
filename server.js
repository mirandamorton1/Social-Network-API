// express
const express = require('express');
// db from config
const db = require('./config/connection');
// routes from routes
const routes = require('./routes');

// port
const PORT = process.env.PORT || 3001;
const app = express();
// app

// app.use for url encoded
app.use(express.urlencoded({ extended: true }));
// app.use for express.json
app.use(express.json());
// app.use for routes
app.use(routes);

//set up app to listen ocne db is open
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});