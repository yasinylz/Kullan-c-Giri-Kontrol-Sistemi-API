const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Question = require("./Question");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Lütfen bir isim girin!"]
    },
    email: {
        type: String,
        required: [true, "Lütfen bir e-posta adresi girin!"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Lütfen geçerli bir e-posta sağlayın"]
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        minlength: [6, "Lütfen en az 6 karakter uzunluğunda bir şifre girin!"],
        required: [true, "Lütfen bir şifre girin!"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
});

// UserSchema Methods
UserSchema.methods.generateJwtFromUser = function() {
    const { JWT_SECREY_KEY, JWT_EXPIRE } = process.env;
    const payload = {
        id: this.id,
        name: this.name
    };
    const token = jwt.sign(payload, JWT_SECREY_KEY, { expiresIn: JWT_EXPIRE });
    return token;
};

UserSchema.methods.getResetPasswordTokenFromUser = function() {
    const { RESET_PASSWORD_EXPIRE } = process.env;
    const randomHexString = crypto.randomBytes(15).toString("hex");
    const resetPasswordToken = crypto.createHash("SHA256").update(randomHexString).digest("hex");
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);
    return resetPasswordToken;
};

// Bcrypt use / pre hooks
UserSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);

            this.password = hash;
            next();
        });
    });
});

UserSchema.pre('findOneAndDelete', async function(next) {
    const user = await this.model.findOne(this.getFilter());
    await Question.deleteMany({ user: user.id });
    next();
});

module.exports = mongoose.model("User", UserSchema);
