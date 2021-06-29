const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    empleadoid: String
    name: String
    lastName: String
    username: String
    email: String
    password: String
    nationality: String
    phone: String
    civilStatus: String
    birthday: String
    createAt: String
  }
  type Token {
    token: String
  }
  input UserInput {
    name: String!
    empleadoid: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    nationality: String!
    phone: String
    civilStatus: String!
    birthday: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input UserUpdateInput {
    name: String
    lastName: String
    email: String
    phone: String
  }
  type Query {
    # User
    getUser: User
    getNotFolloweds: [User]
    search(search: String): [User]
  }
  type Mutation {
    #User
    register(input: UserInput): User
    login(input: LoginInput): Token
    updateUser(input: UserUpdateInput): Boolean
  }
`;

module.exports = typeDefs;
