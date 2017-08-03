import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")`}}></div>
                  <div className="book-shelf-changer">
                    <select value={(books.findIndex(x => x.id === book.id) > 0) ? (books[books.findIndex(x => x.id === book.id)].shelf) : ('none')} onChange={(e) => onUpdate(book, e)}>
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.hasOwnProperty('authors') &&
                  <div className="book-authors">{book.authors.join(', ')}</div>
                }
              </div>
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
