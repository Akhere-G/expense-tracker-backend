const graphql = require("graphql");
const { GraphQLDate } = require("graphql-iso-date");

const { transactions, Category, users } = require("../data");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
} = graphql;

const Type = new GraphQLEnumType({
  name: "type",
  values: {
    invoice: { value: "income" },
    expense: { value: "expense" },
  },
});

const mapCategoriesToType = () =>
  Object.entries(Category).reduce((acc, curr) => {
    acc[curr[0]] = { value: curr[1] };
    return acc;
  }, {});

const CategoryType = new GraphQLEnumType({
  name: "Category",
  values: mapCategoriesToType(),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    isGoogle: { type: GraphQLBoolean },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    transactions: { 
      type: GraphQLList(TransactionType),
    resolve(parent, args){
      return transactions.filter( t => t.ownerID === parent.id)
    }
  }
  }),
});

const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    type: { type: Type },
    category: { type: CategoryType },
    description: { type: GraphQLString },
    date: { type: GraphQLDate },
    owner: { 
      type: UserType,
      resolve(parent, args){
        return users.find(u => u.id === parent.ownerID )
      }
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    transaction: {
      type: TransactionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return transactions.find((t) => t.id === args.id);
      },
    },
    transactions: {
      type: GraphQLList(TransactionType),
      resolve(parent, args) {
        return transactions;
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return users.find((u) => u.id === args.id);
      },
    },
    users: {
      type: GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
