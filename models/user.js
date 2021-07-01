const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// below-this plugin handles username and password fields- so they are removed from the Schema
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);