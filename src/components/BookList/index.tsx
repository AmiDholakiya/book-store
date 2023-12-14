import { useSelector } from "react-redux";
import "./bookList.css"
import { Table } from "react-bootstrap";
import { RootState, useAppDispatch } from "../../redux/store";
import { deleteBook, updateBook } from '../../redux/bookSlice';
import DeleteImg from "../../assets/DeleteImg.png";
import { Book, BookModal, NoData } from "../index";
import { useState } from "react";
import { BookType } from "types";

export const initialBookObj = {
    name: "",
    price: null,
    category: "",
    description: "",
    id: ""
}

const BookList = () => {
    const dispatch = useAppDispatch()
    const itemsPerPage = 1
    const bookList = useSelector((state: RootState) => state.books.bookList);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [bookModalShow, setBookModalShow] = useState(false);
    const [deleteBookShow, setDeleteBookShow] = useState(false);
    const [selectedBook, setSelectedBook] = useState<BookType>(initialBookObj)
    const [updatedBook, setUpdatedBook] = useState<BookType>(initialBookObj)

    const totalPages = Math.ceil(bookList.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bookList.slice(indexOfFirstItem, indexOfLastItem);

    const closeBookModal = () => {
        setBookModalShow(false);
        setSelectedBook(initialBookObj);
        setUpdatedBook(initialBookObj)
    }

    const updateBookClick = () => {
        dispatch(updateBook(updatedBook))
        closeBookModal()
    }

    const handleChange = (data: BookType) => {
        setUpdatedBook(data);
    }

    const closeDeleteBookModal = () => {
        setDeleteBookShow(false);
        setSelectedBook(initialBookObj)
    }

    const deleteBookLocal = () => {
        dispatch(deleteBook(selectedBook.id))
        closeDeleteBookModal();
    }

    const handlePageChange = (pageNumber:Number) => {
        setCurrentPage(pageNumber);
      };

    return <>
        <div className="book-list-card">
            <div className="book-list">
                <Table responsive striped bordered hover table-bordered variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                        bookList.length === 0 ? <tr><td colSpan={6}><NoData /></td></tr> :
                                currentItems.map((book) => <tr>
                                    <td onClick={() => { setBookModalShow(true); setSelectedBook(book) }}>{book.id}</td>
                                    <td onClick={() => { setBookModalShow(true); setSelectedBook(book) }}>{book.name}</td>
                                    <td onClick={() => { setBookModalShow(true); setSelectedBook(book) }}>{book.price}</td>
                                    <td onClick={() => { setBookModalShow(true); setSelectedBook(book) }}>{book.category}</td>
                                    <td onClick={() => { setBookModalShow(true); setSelectedBook(book) }}>{book.description}</td>
                                    <td className="action-col"><img src={DeleteImg} onClick={() => {
                                        setDeleteBookShow(true);
                                        setSelectedBook(book)
                                    }} /></td>
                                </tr>)
                            }
                        </tbody>
                    
                </Table>

            </div>
            <div className="action-bar">
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item${currentPage === 1 ? " disabled":""}`} onClick={() => { return currentPage === 1 ? null : handlePageChange(currentPage - 1)}}>
                            <a className="page-link">Previous</a>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li className={`page-item${index + 1 === currentPage ? " active":""}`} key={index + 1} onClick={() => handlePageChange(index + 1)}><a className="page-link" >{index + 1}</a></li>

                        ))}
                        <li className={`page-item${currentPage === totalPages ? " disabled":""}`} onClick={() => { return currentPage === totalPages ? null : handlePageChange(currentPage + 1)}}>
                            <a className="page-link" >Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        {/* Update Book Modal */}
        <BookModal showModal={bookModalShow} title={`Update Book (#${selectedBook["id"]})`} onSubmit={() => updateBookClick()} onClose={() => closeBookModal()} submitButtonText="Update" >
            <Book book={selectedBook} handleChange={handleChange} />
        </BookModal>

        {/* Delete Book Modal */}
        <BookModal showModal={deleteBookShow} title={`Delete Confirmation`} onSubmit={() => deleteBookLocal()} onClose={() => closeDeleteBookModal()} submitButtonText="Delete" >
            <h4>{`Are you sure to delete ${selectedBook.name} book ?`} </h4>
        </BookModal>


    </>
}

export default BookList;