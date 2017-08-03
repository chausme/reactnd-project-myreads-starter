import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    query: ''
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  updateBook = (book, event) => {

    let shelf = event.target.value;

    this.setState(function (state) {

      if (state.books.findIndex(x => x.id === book.id) > 0) {
        state.books[state.books.findIndex(x => x.id === book.id)].shelf = shelf;
      } else {
        book.shelf = shelf;
        state.books.push(book);
      }

      console.log(book.shelf);

      return {
        books: state.books
      }
    });

    BooksAPI.update(book, shelf);

  }
  searchBook = (event) => {

    let query = event.target.value;

    this.setState({ query:event.target.value })

    BooksAPI.search(query).then((searchResults) => {
      this.setState({ searchResults })
    })

    console.log(query);

  }
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            onUpdate={this.updateBook}
            books={this.state.books}
          />
        )}/>
        <Route exact path='/search' render={() => (
          <Search
            searchResults={this.state.searchResults}
            onSearch={this.searchBook}
            onUpdate={this.updateBook}
            query={this.state.query}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
