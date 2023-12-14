import "./home.css"
import BookList, { initialBookObj } from "../BookList";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { AddBookType, BookType } from "types";
import Book from "components/Book";
import BookModal from "components/BookModal";
import { useAppDispatch } from "redux/store";
import { addBook } from "redux/bookSlice";
import { generateId } from "utils";
import AddImg from "../../assets/AddIcon.svg"

const Home = () => {
  const dispatch = useAppDispatch()

    const [addModal,setAddModal] = useState(false)
    const [newBook,setNewBook] = useState<BookType>(initialBookObj)

    const addNewBookSubmit = ()=>{
        dispatch(addBook({...newBook,id: generateId(5)}));
        closeAddModal();
    }

    const closeAddModal = () =>{
        setAddModal(false);
        setNewBook(initialBookObj)
    }

    const handleAddBookChange = (data: BookType) => {
        setNewBook(data);
    }

    return <>
    <div className="home-body">
        <div className="top-bar">
            <Button onClick={()=>{setAddModal(true)}} className="add-btn">Add New Book <img className="add-image" src={AddImg}/></Button>
        </div>
        <BookList />
    </div>
    <BookModal showModal={addModal} title={`Add New Book`} onSubmit={() => addNewBookSubmit()} onClose={() => closeAddModal()} submitButtonText="Add" >
            <Book book={initialBookObj} handleChange={handleAddBookChange} />
        </BookModal>
    </>
}

export default Home;