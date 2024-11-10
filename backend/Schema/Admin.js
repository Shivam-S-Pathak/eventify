const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new Schema(
    {
      fullname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        unique: true,
        required: true,
      },
    },
    { timestamps: true }
  );

  AdminSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      const bcrypt = require("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    next();
  });

  const Admin = model("admins", AdminSchema);

  module.exports = Admin;