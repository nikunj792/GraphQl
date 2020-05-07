import React from "react";
import {gql} from "apollo-boost";
import { graphql } from 'react-apollo';

const getBookQuery = gql`{
    books{
        name,
        id
    }
}`

function BookList(props) {
    const { data } = props;
    console.log('1111', data)
  return (
     data.books != 'undefined' ? <div id="App">
      <ul id="book-list">
  {data.books && data.books.map((item, id)=>{return<li key={id}> {item.name}</li>})}
      </ul>
    </div>: 'Loading'
  );
}

export default graphql(getBookQuery)(BookList);
