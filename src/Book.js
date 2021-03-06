import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  render() {

    const { books, book, onUpdate } = this.props

    return(

      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")`}}></div>
          <div className="book-shelf-changer">
            <select value={(books.findIndex(x => x.id === book.id) >= 0) ? (books[books.findIndex(x => x.id === book.id)].shelf) : ('none')} onChange={(e) => onUpdate(book, e)}>
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

    )
  }

}

export default Book
