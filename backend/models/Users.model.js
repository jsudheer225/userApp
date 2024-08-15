const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

const UsersSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    jabber: {
        type: String,
        required: true,
    },
    aolIm: {
        type: String,
        required: true,
    },
    yahooIm: {
        type: String,
        required: true,
    }
});


UsersSchema.pre('save', async function (next) {
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

UsersSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcryptjs.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

UsersSchema.methods.deleteToken = async function(token, cb) {
    var user = this;
    user.update({unset: {token :1}}, function(err, user) {
        if(err) return cb(err);
        cb(null,user);
    })
}

const User = mongoose.model('users', UsersSchema);
module.exports = User;