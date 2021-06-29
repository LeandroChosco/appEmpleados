const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");
require("dotenv").config({ path: ".env" });

mongoose.connect(
  process.env.BBDD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err, _) => {
    if (err) {
      console.log("Error de conexion");
    } else {
      server();
    }
  }
);

function server() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;
      if (token) {
        try {
          const user = jwt.verify(
            token.replace("Bearer ", ""),
            process.env.SECRET_KEY
          );
          return {
            user,
          };
        } catch (error) {
          console.log("####ERROR!!####");
          console.log(error);
          new Error("Token Invalido");
        }
      }
    },
  });
  serverApollo.listen().then(({ url }) => {
    console.log("##########################");
    console.log(`Servidor Levantado en la url ${url}`);
    console.log("##########################");
  });
}
