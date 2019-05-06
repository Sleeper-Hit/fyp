var orders = require('./../controllers/orders.js');
var users = require('./../controllers/users.js');
const passport   =  require('passport')

module.exports = function(app) {
    app.get('/rooms', users.CheckLogin, orders.list)
    app.route('/rooms/create')
      .get(users.CheckLogin, orders.renderCreate)
      .post(users.CheckLogin, orders.create);

    app.get('/rooms/all', passport.authenticate('jwt', {session: false}), orders.listRooms)

    app.post('/rooms/:roomsId/book', passport.authenticate('jwt', {session: false}), orders.bookRoom)
    app.post('/rooms/:roomsId/unbook', passport.authenticate('jwt', {session: false}), orders.unbookRoom)

    app.route('/rooms/:roomsId')
      .get(users.CheckLogin, orders.read)
      .put(users.CheckLogin, orders.update)
      .delete(users.CheckLogin, orders.delete);

    app.get('/list_booked', passport.authenticate('jwt', {session: false}), orders.listBookedRooms);

    app.get('/rooms/:roomsId/delete', users.CheckLogin, orders.renderDelete)

    app.param('roomsId', orders.orderByID);
};
