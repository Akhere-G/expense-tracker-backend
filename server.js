const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())


const CONNECTION_URL = process.env.CONNECTION_URL

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch(err => console.log(`Could not connect. ${err.message}`))
