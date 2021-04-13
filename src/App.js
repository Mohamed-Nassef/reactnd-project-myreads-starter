import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import Search from './Search'
import BooksData from './BooksData'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    this.updateData()
  }
  updateData = () => {
    const x = BooksAPI.getAll();
    x.then(result => {
      // console.log(result)
      this.setState({ books: result })
    });
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <BooksData
            currentBooks={this.state.books}
            updateShelf={this.updateShelf} />}
        />
        <Route
          path="/search"
          render={() =>
            <Search
              updateShelf={this.updateShelf}
              currentBooks={this.state.books} />} />
      </div>
    );
  }
}
//   render() {
//     //console.log(this.state)
//     return (
//       <div className="app">
//         {this.state.showSearchPage ? (
//           <div className="search-books">
//             {console.log(this.state.allData)}
//             <div className="search-books-bar">
//               <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
//               <div className="search-books-input-wrapper">
//                 {/*
//                   NOTES: The search from BooksAPI is limited to a particular set of search terms.
//                   You can find these search terms here:
//                   https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

//                   However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
//                   you don't find a specific author or title. Every search is limited by search terms.
//                 */}
//                 <input type="text" placeholder="Search by title or author" />

//               </div>
//             </div>
//             <div className="search-books-results">
//               <ol className="books-grid">

//               </ol>
//             </div>
//           </div>
//         ) : (
//             <div className="list-books">
//               <div className="list-books-title">
//                 <h1>MyReads</h1>
//               </div>
//               <div className="list-books-content">
//                 <div>
//                   <div className="bookshelf">
//                     <h2 className="bookshelf-title">Currently Reading</h2>
//                     <div className="bookshelf-books">
//                       <ol className="books-grid">

//                       </ol>
//                     </div>
//                   </div>
//                   <div className="bookshelf">
//                     <h2 className="bookshelf-title">Want to Read</h2>
//                     <div className="bookshelf-books">
//                       <ol className="books-grid">

//                       </ol>
//                     </div>
//                   </div>
//                   <div className="bookshelf">
//                     <h2 className="bookshelf-title">Read</h2>
//                     <div className="bookshelf-books">
//                       <ol className="books-grid">
//                       </ol>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="open-search">
//                 <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
//               </div>
//             </div>
//           )}
//       </div>
//     )
//   }
// }

export default BooksApp
