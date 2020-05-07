import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAuthorQuery = gql`
  {
    authors {
      name
    }
  }
`;

function AddBook(props) {
  const { data } = props;
  console.log("1111", data);
  return data.authors != "undefined" ? (
    <form id="field">
      <div className="bookname">
        <label for="book-name">Book Name</label>
        <input type="text" id="book-name" className="book-name" />
      </div>
      <div className="genre">
        <label for="genre">Genre</label>
        <input type="text" id="genre" className="genre" />
      </div>
      <div className="author">
        <label for="author-name">Author Name </label>
        <select>
          {data.authors &&
            data.authors.map((item, id) => {
              return <option key={id}> {item.name}</option>;
            })}
        </select>
      </div>
    </form>
  ) : (
    "Loading"
  );
}

export default graphql(getAuthorQuery)(AddBook);
