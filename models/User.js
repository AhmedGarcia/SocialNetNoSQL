const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
          
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address' ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought', //Reference to the Thought model
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],  
    },
    {
        toJSON: {
            virtuals: true, //Include virtua;s when data is serialized
        },
        id: false,  //Disable the virtual 'id' field
    }
);

//Virtual to get friend count dynamically
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//Create and export the User model
const User = model('User', userSchema);

module.exports = User;