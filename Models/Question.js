const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: [true, "Lütfen Bir İsim Giriniz"],
    minlength: [10, "Lütfen minimium 10 karaktere sahip olsun"],
    unique: true
  },
  content: {
    type: String,
    required: [true, "Lütfen Bir Metin Gir"],
    minlength: [20, "Lütfen minimum 20 karakter olsun"]
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User"
  },
  likeCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
  answerCount: {
    type: Number,
    default: 0
  },
  answers: [{
    type: mongoose.Schema.ObjectId,
    ref: "Answer"
  }]
});

QuestionSchema.pre("save", function (next) {
  if (!this.isModified("title")) {
    return next();
  }
  this.slug = this.makeSlug();
  next();
});

QuestionSchema.methods.makeSlug = function () {
  return slugify(this.title, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    trim: true
  });
};

module.exports = mongoose.models.Question || mongoose.model("Question", QuestionSchema);
