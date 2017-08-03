import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Search extends Component {

  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  render() {

    const { books, searchResults, onSearch, onUpdate, query } = this.props

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" value={query} placeholder="Search by title or author" onChange={(e) => onSearch(e)} />

          </div>
        </div>
        <div className="search-books-results">
        {(searchResults === undefined) || (searchResults.hasOwnProperty('error')) ? (
          <p>Sorry, seems there are no results for your search</p>
        ) : (
          <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Book
                books={books}
                book={book}
                onUpdate={onUpdate}
              />
            </li>
          ))}
          </ol>
        )}
        </div>
      </div>
    )
  }

}

export default Search
