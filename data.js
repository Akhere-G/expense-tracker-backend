const Category = {
  Misc: "Misc",
  Groceries: "Groceries",
  Travel: "Travel",
  Social: "Social",
  Rent: "Rent",
  Utilities: "Utilities",
  Phone: "Phone",
  Clothes: "Clothes",
  Invoice: "Invoice",
  Gifts: "Gifts",
};

const Type = ["income", "expense"];

const getDate = (date) => new Date(date);

const transactions = [
  {
    id: "1",
    amount: 50,
    type: "expense",
    description: "New Jeans",
    category: Category.Clothes,
    date: getDate("2021-08-01"),
    ownerID: "u1",
  },
  {
    id: "2",
    amount: 10,
    type: "income",
    description: "Birthday gift",
    category: Category.Gifts,
    date: getDate("2021-08-05"),
    ownerID: "u1",
  },
  {
    id: "3",
    amount: 15,
    type: "expense",
    description: "Shopping",
    category: Category.Groceries,
    date: getDate("2021-08-10"),
    ownerID: "u1",
  },
  {
    id: "4",
    amount: 400,
    type: "income",
    description: "Work payment",
    category: Category.Invoice,
    date: getDate("2021-08-12"),
    ownerID: "u3",
  },
  {
    id: "5",
    amount: 10,
    type: "expense",
    description: "New Headphones",
    category: Category.Misc,
    date: getDate("2021-08-12"),
    ownerID: "u2",
  },
  {
    id: "6",
    amount: 40,
    type: "expense",
    description: "Phone bill",
    category: Category.Phone,
    date: getDate("2021-08-15"),
    ownerID: "u3",
  },
  {
    id: "7",
    amount: 100,
    type: "expense",
    description: "Rent came",
    category: Category.Rent,
    date: getDate("2021-08-18"),
    ownerID: "u3",
  },
  {
    id: "8",
    amount: 40,
    type: "expense",
    description: "BBQ at the park",
    category: Category.Social,
    date: getDate("2021-08-19"),
    ownerID: "u2",
  },
  {
    id: "9",
    amount: 70,
    type: "expense",
    description: "Tube money",
    category: Category.Travel,
    date: getDate("2021-08-22"),
    ownerID: "u2",
  },
  {
    id: "10",
    amount: 10,
    type: "expense",
    description: "Water and gas bill",
    category: Category.Utilities,
    date: getDate("2021-08-26"),
    ownerID: "u1",
  },
];

const users = [
  {
    id: "u1",
    isGoogle: false,
    firstName: "John",
    lastName: "Smith",
    email: "example@example.com",
  },
  {
    id: "u2",
    isGoogle: false,
    firstName: "Sarah",
    lastName: "Lee",
    email: "fun@example.com",
  },
  {
    id: "u3",
    isGoogle: false,
    firstName: "Ade",
    lastName: "Johnson",
    email: "Ade@example.com",
  },
];
module.exports = { transactions, Category, Type, users };
