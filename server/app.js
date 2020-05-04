const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema')

const app = express();

mongoose.connect('mongodb+srv://admin:<password>@cluster0-lkwrt.mongodb.net/test?retryWrites=true&w=majority')
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, ()=>{
    console.log('Server is running on PORT 3000');
});

