var orders = require('./../controllers/orders.js');
var users = require('./../controllers/users.js');
const passport   =  require('passport')

module.exports = function(app) {
    app.get('/rooms', users.CheckLogin, orders.list)
    app.route('/rooms/create')
      .get(users.CheckLogin, orders.renderCreate)
      .post(users.CheckLogin, orders.create);

    app.get('/rooms/all', passport.authenticate('jwt', {session: false}), orders.listRooms)

    app.route('/rooms/:roomsId')
      .get(users.CheckLogin, orders.read)
      .put(users.CheckLogin, orders.update)
      .delete(users.CheckLogin, orders.delete);

    app.get('/rooms/:roomsId/delete', passport.authenticate('jwt', {session: false}),  orders.renderDelete)

    app.param('roomsId', orders.orderByID);
};
