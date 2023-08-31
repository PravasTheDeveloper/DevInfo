const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const os = require("os")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true
    },
    profession: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    profile_pic: {
        type: String,
    },
    poster_pic: {
        type: String,
        default: "posterUpload.gif"
    },
    followers: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
    notifications: [
        {
            type: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            read: {
                type: Boolean,
                default: false,
            },
        },
    ],
    tokens: [
        {
            token: {
                type: String,
            },
            deviceUser: {
                type: String,
            },
            deviceInfo: {
                type: String,
            }
        },
    ],
},
    {
        timestamps: true
    }
)

//Hassing the Password

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//Generate Web Token

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY || "THISISOURDEVINFOWEBSITEDEVELOPBYPRAVASCHANDRASARKARLOVEYOUALL");
        let deviceInfo = os.type()
        let deviceUser = os.hostname()
        this.tokens = this.tokens.concat({ token, deviceInfo, deviceUser });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema)

module.exports = User