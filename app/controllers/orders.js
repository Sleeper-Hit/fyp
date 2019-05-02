
const mongoose   =  require('mongoose');
// const config     =  require('../../config/env/development.js');
// const jwt        =  require('jsonwebtoken');

/**
* Models
*/

const Orders  =  mongoose.model('Room');

let getErrorMessage = function(err) {
		if(err.errors) {
				var message = '';
				for (var i in err.errors) {
						if (err.errors[i].message) {
								message = err.errors[i].message;
						}
				}
				return message;
		} else {
				console.log(err);
				return "Unknown server error";
		}
};

exports.create = function(req, res) {
	  let order = new Orders(req.body);
	  order.PostedBy = req.user._id;

    order.save(function(err, info) {
        if(err) {
            console.log(err);
            return res.status(400).send({message: getErrorMessage(err)});
        } else {
            return res.redirect("/rooms");
        }
    });
};

exports.list = function(req, res) {
    Orders.find({PostedBy: escape(req.user.id)}).exec(function(err, info) {
        if(err) {
            console.log(err);
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else res.render('list', {orders: info});
    });
};

exports.listRooms = function(req, res) {
    Orders.find({Booked: false}).exec(function(err, info) {
        if(err) {
            console.log(err);
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else return res.send({articles: info, success: true});
    });
};

exports.renderCreate = function (req, res) {
   res.render('create');
};

exports.read = function(req, res) {
    res.render('update', {data: req.order, link: '/rooms/' + req.order._id});
};

exports.orderByID = function(req, res, next, id) {
    Orders.findById(id).exec(function(err, info) {
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            })
        }
        if(!info) {
            return next(new Error('Error: Failed to load article ' + id));
        }
        else {
            req.order = info;
        }
        next();
    });
};

exports.update = function(req, res) {
    var order = req.order;

    order.Title = req.body.Title;
    order.Options = req.body.Options;
    order.Address = req.body.Address;
    order.Price = req.body.Price;

    order.save(function(err) {
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
					res.send(order);
				}
    });
};

exports.bookRoom = function(req, res) {
    var order = req.order;

    order.Booked = true;

		order.save(function(err) {
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
					res.send(order);
				}
    });
};

exports.unbookRoom = function(req, res) {
    var order = req.order;
    order.Booked = false;

		order.save(function(err) {
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
					res.send(order);
				}
    });
};

exports.renderDelete = function (req, res) {
   res.render('delete', {data: req.order, link: '/rooms/' + req.order._id});
};

exports.delete = function(req, res) {
    var order = req.order;

    order.remove(function(err) {
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else res.send(order);
    });
};
