const Follow = require("../models/follow");
const User = require("../models/user");

async function getNotFolloweds(ctx) {
  const users = await User.find().limit(10).sort({ name: 1 });

  const arrayUsers = [];
  for await (const user of users) {
    arrayUsers.push(user);
  }

  return arrayUsers;
}

module.exports = {
  getNotFolloweds,
};
