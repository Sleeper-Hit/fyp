var mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect('mongodb://heroku_dlkjf63h:1bohnoa1c91qpo5hq63kt710r@ds157742.mlab.com:57742/heroku_dlkjf63h', {useNewUrlParser: true});

    require('./../app/models/orders.js');
    require('./../app/models/users.js');

    return db;
}
