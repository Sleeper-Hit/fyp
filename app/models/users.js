const mongoose   =  require('mongoose');
const crypto     =  require('crypto');
const Schema     =  mongoose.Schema;

let UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        format: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email address!']
    },
    password: {
      type: String,
      required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', function(next) {
    if(this.password) {
        this.salt = new Buffer(crypto.randomBytes(48).toString(), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

UserSchema.statics.checkEmail = function(email, next) {
    this.findOne({
        email: email
    }, function(err, user) {
        if(err) {
            return 'An error occurred, Please Try Again';
        } else if(user) {
            return false;
        } else return true;
    });
};

mongoose.model('User', UserSchema);
