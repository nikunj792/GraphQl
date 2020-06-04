import React from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import {flowRight as compose} from 'lodash';

const getAuthorQuery = gql`
  {
    authors {
      name,
      id
    }
  }
`;

const addMutation = gql`
    mutation{
        addBook(name:"", genre: "", authorId:""){
            name,
            id
        }
    }
`


class AddBook extends React.PureComponent {

    constructor(props){
        super(props);
        this.state={
            bookName: '',
            genre: '',
            authorId: ''
        }
    }
     handleSubmit = (e)=> {
         e.preventDefault();
         this.props.addMutation()
        console.log(`value typed is ${this.state.bookName} and genre is ${this.state.genre} and author id  is ${this.state.authorId}`);
      }

      handleInput = (e)=>{
          this.setState({
              [e.target.name] : e.target.value
          })
      }
  render() {
    const { data }  = this.props;
    return data.authors != "undefined" ? (
      <form id="field">
        <div className="book-name">
          <label for="book-name">Book Name</label>
          <input
            type="text"
            id="book-name"
            className="book-name"
            name="bookName"
            onChange={e => this.handleInput(e)}
          />
        </div>
        <div className="genre">
          <label for="genre">Genre</label>
          <input
            type="text"
            id="genre"
            className="genre"
            name="genre"
            onChange={e => this.handleInput(e)}
          />
        </div>
        <div className="author-name">
          <label for="author-name">Author Name </label>
          <select name="authorId" onChange={e =>this.handleInput(e)}>
            {data.authors &&
              data.authors.map((item, id) => {
                return (
                  <option key={id} value={item.id}>
                    {" "}
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <button onClick={() => this.handleSubmit()}>Submit</button>
      </form>
    ) : (
      "Loading"
    );
  }
}

export default graphql(getAuthorQuery) (AddBook)
