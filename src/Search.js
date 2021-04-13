import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class Search extends React.Component {
    state = {
        query: '',
        books: []
    }
    updateData = (books) => {
        const x = books.map(book => {
            book.shelf = "none";
            this.props.currentBooks.forEach(B => {
                if (book.id === B.id) { book.shelf = B.shelf }
            })
            return book
        })
        this.setState({ books: x })
    }
    updateBooks = (book, shelf) => {
        let currentBook = this.state.books;
        const bookToUpdate = currentBook.filter(x => x.id === book.id)[0];
        bookToUpdate.shelf = shelf;
        this.setState({
            books: currentBook
        })
        this.props.updateShelf(book, shelf);
    }
    updateQuery = (val) => {
        this.setState({ query: val })
        if (val) {
            BooksAPI.search(val, 10).then((books) => {
                books.length > 0 ? this.updateData(books) : this.setState({ books: [] })
            });
        }
        else { this.setState({ books: [] }) }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={ev => this.updateQuery(ev.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.filter((book) => (book.imageLinks)).map(book =>
                            <li key={book.id} className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover" style={{
                                            width: 128, height: 174,
                                            backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
                                        }}
                                    />
                                    <div className="book-shelf-changer">
                                        <select
                                            value={book.shelf}
                                            onChange={ev => {
                                                this.updateBooks(book, ev.target.value);
                                            }}
                                        >
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">
                                    {book.title}
                                </div >
                                {book.authors &&
                                    <div className="book-authors">
                                        {book.authors[0]}
                                    </div>}
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}
export default Search;