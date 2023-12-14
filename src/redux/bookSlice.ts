import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { BookType, AddBookType } from "../types";
import { generateId } from "../utils";

type initialStateType = {
    bookList: Array<BookType>
}

const initialState: initialStateType = {
    bookList: []
};

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<BookType>) => {

            state.bookList.push({...action.payload })
        },
        deleteBook: (state, action: PayloadAction<string>) => {
            state.bookList = state.bookList.filter((book: any) => book.id !== action.payload)
        },
        updateBook: (state, action: PayloadAction<BookType>) => {
            state.bookList = state.bookList.map((book: BookType) => book.id == action.payload.id ? action.payload : book)
        }
    }

});

export const { addBook, deleteBook, updateBook } = bookSlice.actions;
export const selectBookList = (state: RootState) => state.books.bookList;
export default bookSlice.reducer;