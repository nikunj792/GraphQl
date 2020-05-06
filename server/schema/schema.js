const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLList,
    GraphQLNonNull
} = graphql;

const Book = require('../models/book');
const Author = require('../models/author');


// const bookArray = [
//   { name: "First", genre: "Genre1", id: "1", authorId : "1" },
//   { name: "Second", genre: "Genre2", id: "2", authorId : "2"  },
//   { name: "Third", genre: "Genre3", id: "3", authorId : "3"  },
//   { name: "Fourth", genre: "Genre4", id: "4", authorId : "1"  },
//   { name: "Fifth", genre: "Genre5", id: "5", authorId : "1"  },
//   { name: "Sixth", genre: "Genre6", id: "6", authorId : "2"  },

// ];

// const authorArray = [
//     { name: "Joe", age: "11", id: "1" },
//     { name: "Dani", age: "12", id: "2" },
//     { name: "Singham", age: "13", id: "3" }
//   ];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
        type: AuthorType,
        resolve: (parent, args)=>{
            // return _.find(authorArray, { id : parent.authorId})
            return Author.findById(parent.authorId)
        }
    }
  }) 
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: { type : GraphQLID },
        name: { type : GraphQLString },
        age: { type : GraphQLInt },
        books: { type : new GraphQLList( BookType),
        resolve: (parent, args)=>{
            // return _.filter(bookArray, { authorId : parent.id})
            return Book.find({
                authorIdc: parent.id
            })
        }
        }
    })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //Code to get data from DB
        // return _.find(bookArray, { id: args.id });
        return Book.findById(args.id)
      }
    },
    author:{
        type: AuthorType,
        args: { id : { type: GraphQLID }},
        resolve : (parent, args)=>{
            // return _.find(authorArray, { id: args.id })
            return Author.findById(args.id)
        }
    },
    books:{
        type: new GraphQLList(BookType),
        resolve: ()=>{
            // return bookArray
            return Book.find({})
        }
    },
    authors:{
        type : new GraphQLList(AuthorType),
        resolve: ()=>{
            // return authorArray
            return Author.find({})
        }
    }
  },
});

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addAuthor : {
            type : AuthorType,
            args : {
                name : { type : new GraphQLNonNull(GraphQLString) },
                age : { type : new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({
                    name : args.name,
                    age : args.age
                });
                return author.save();
            }
        },
        addBook : {
            type : BookType,
            args : {
                name : { type : new GraphQLNonNull(GraphQLString) },
                genre : { type :  new GraphQLNonNull(GraphQLString) },
                authorId : { type : new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
