const { connect, connection} = require('mongoose');

// Connection string for MongoDB

const connectionString = 'mongodb://127.0.0.1:27017/socialDB';

// Connect to MongoDB using the connection string\
connect( connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Export the connection
module.exports = connection;