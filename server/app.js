const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema')

const app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0-lkwrt.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.log("Error: ", err.message));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, ()=>{
    console.log('Server is running on PORT 3000');
});

