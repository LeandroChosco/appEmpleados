const userController = require("../controllers/user");
const followController = require("../controllers/follow");
const resolvers = {
  Query: {
    //User
    getUser: (_, { id, username }) => userController.getUser(id, username),
    getNotFolloweds: (_, {}, ctx) => followController.getNotFolloweds(ctx),
    search: (_, { search }) => userController.search(search),
  },
  Mutation: {
    //User
    register: (_, { input }) => userController.register(input),
    login: (_, { input }) => userController.login(input),
    updateUser: (_, { input }, ctx) => userController.updateUser(input, ctx),
  },
};

module.exports = resolvers;
