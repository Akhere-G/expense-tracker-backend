const graphql = require("graphql");
const { GraphQLDate } = require("graphql-iso-date");

const { transactions } = require("../data");

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
    invoice: { value: "invoice" },
    expense: { value: "expense" },
  },
});

const CategoryType = new GraphQLEnumType({
  name: "Category",
  values: {
    Mis: { value: "Misc" },
    Groceries: { value: "Groceries" },
    Travel: { value: "Travel" },
    Social: { value: "Social" },
    Rent: { value: "Rent" },
    Utilities: { value: "Utilities" },
    Phone: { value: "Phone" },
    Clothes: { value: "Clothes" },
    Invoice: { value: "Invoice" },
    Gifts: { value: "Gift" },
  },
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
        console.log("in resolve", parent, args);
        return transactions.find((t) => t.id === args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
