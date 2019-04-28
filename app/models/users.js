const mongoose   =  require('mongoose');
const crypto     =  require('crypto');
const Schema     =  mongoose.Schema;

let UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "user"
    },
    email: {
      type: String,
      required: true
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

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);
