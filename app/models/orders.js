var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoomSchema = new Schema({
    Title: {
      type: String,
      required: true
    },
    Options: {
      type: String,
      required: true
    },
    Address: {
      type: String,
      required: true
    },
    Price: {
      type: String,
      required: true
    },
    Booked: {
      type: Boolean,
      default: false
    },
    PostedBy: {
      type: String,
      required: true
    }
});

mongoose.model('Room', RoomSchema);
