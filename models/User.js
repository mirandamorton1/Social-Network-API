// schema and model from mongoose
const { Schema, model } = require('mongoose');

const userSchema = new userSchema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        thoughts: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends // same patterna as thoughts
    },
    {
        // use virtuals to true
    }
);
// set up virtual for friendCount

// set up model

//export model