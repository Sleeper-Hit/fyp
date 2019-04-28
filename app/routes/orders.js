var orders = require('./../controllers/orders.js');

module.exports = function(app) {
    app.get('/rooms', orders.list)
    app.route('/rooms/create').get(orders.renderCreate).post(orders.create);

    app.get('/rooms/all', orders.listRooms)

    app.route('/rooms/:roomsId').get(orders.read)
      .put(orders.update).delete(orders.delete);

    app.get('/rooms/:roomsId/delete', orders.renderDelete)

    app.param('roomsId', orders.orderByID);
};
