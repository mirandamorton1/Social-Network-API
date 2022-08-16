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
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please use a valid email address']
        },
        thoughts: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);
// set up virtual for friendCount 
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// set up model
const User = model('User', userSchema);

//export model
module.exports = User;