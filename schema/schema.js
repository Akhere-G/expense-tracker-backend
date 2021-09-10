const graphql = require("graphql");
const { GraphQLDate } = require("graphql-iso-date");

const { transactions, Category } = require("../data");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLSchema,
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

const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  fields: () => ({
    id: { type: GraphQLID },
    amount: { type: GraphQLFloat },
    type: { type: Type },
    category: { type: CategoryType },
    description: { type: GraphQLString },
    date: { type: GraphQLDate },
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
      type: TransactionType,
      resolve(parent, args) {
        return transactions;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
