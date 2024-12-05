const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "El nombre es requerido"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "El correo es requerido"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"]
  }
});

// Hasheado de la contraseña antes de guardar
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    } catch (err) {
      next(err);
    }
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
