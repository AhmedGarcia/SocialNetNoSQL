const moment = require('moment'); // Moment.js for date formatting

module.exports = (timestamp) => {
    return moment(timestamp).format('MM DD, YYYY [at] hh:mm A')
};