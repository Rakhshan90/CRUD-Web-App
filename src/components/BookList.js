import { doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Table, Button } from "react-bootstrap";
import bookServices from '../services/book-services';
const BookList = ({getBookId}) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);
  const getBooks = async () => {
    const data = await bookServices.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };
  const deleteHandler = async (id)=>{
    await bookServices.deleteBook(id);
    getBooks();
  };
  return (
    <>
      {/* <pre>{JSON.stringify(books, undefined, 4)}</pre> */}
      <div className="mb-2">
        <Button variant="outline-dark" onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      <Table className='table-items' striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
                <td>
                  <Button variant="secondary" size='sm' className='edit' onClick={(e)=>getBookId(doc.id)}>
                    Edit
                  </Button>
                  <Button variant="secondary" size='sm' className='delete' onClick={(e)=>deleteHandler(doc.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}

        </tbody>
      </Table>
    </>
  )
}

export default BookList