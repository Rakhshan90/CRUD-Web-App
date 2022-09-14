import { db } from "../firebase";

import {
    collection, 
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    doc
} from "firebase/firestore"

const bookCollectionRef = collection(db, "books");
class BookDataService{
    addBooks = (newBook) =>{
        return addDoc(bookCollectionRef ,newBook)
    }; 
    updateBook = (id, updatedBook)=>{
        const bookDoc = doc(db, "books", id);
        return updateDoc(bookDoc, updatedBook);
    };
    deleteBook = (id)=>{
        const bookDoc = doc(db, "books", id);
        return deleteDoc(bookDoc);
    };
    getAllBooks = ()=>{
        return getDocs(bookCollectionRef);
    };
    getBook = (id)=>{
        const bookDoc = doc(db, "books", id);
        return getDoc(bookDoc);
    };
}
export default new BookDataService();