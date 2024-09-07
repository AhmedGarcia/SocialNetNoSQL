const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Reaction schema is a subdocument, not a separate model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(), //Automatically generate ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280, //Limiit reaction to 289 characters
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp), //Format date on retrieval
        },
    },
    {
        toJSON: {
            getters: true, //Enables getters for 'createdAt'
        },
        id: false,
    }
);

// Thought schema definition
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true, 
            minlength: 1,
            maxlength: 280, //Limit thought too 280 characters
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp), // Foormats date on retrieval
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], //Array of reactions
    },
    {
            toJSON: {
                virtuals: true, //Includes virtuals when data is serialized
                getters: true,  //Enables getters for 'createdAt'
            },
            id: false,
    }
    
);

// Virtual to get reaction count dynamically
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//Create and export the Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;