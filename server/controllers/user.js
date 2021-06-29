const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user, SECRET_KEY, expiresIn) {
  const { id, name, email } = user;
  const payload = {
    id,
    name,
    email,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();

  const { email, password } = newUser;
  // Se revisa si el email esta en uso
  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("El email esta en uso");
  // Encriptar contraseña
  const salt = await bcryptjs.genSalt(10);
  newUser.password = await bcryptjs.hash(password, salt);
  try {
    const user = new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function login(input) {
  const { email, password } = input;

  const userFound = await User.findOne({ email: email.toLowerCase() });
  if (!userFound) throw new Error("Error en el email o contraseña");

  const passwordSucess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSucess) throw new Error("Error en el email o contraseña");

  return {
    token: createToken(userFound, process.env.SECRET_KEY, "24h"),
  };
}
async function search(search) {
  const users = await User.find({ $text: { $search: search } });

  return users;
}
async function getUser(id, username) {
  let user = null;
  if (id) user = await User.findById(id);
  if (username) user = await User.findOne({ username });
  if (!user) throw new Error("El usuario no existe");
  return user;
}

async function updateUser(input, ctx) {
  const { id } = ctx.user;

  try {
    await User.findByIdAndUpdate(id, input);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  register,
  login,
  search,
  getUser,
  updateUser,
};
